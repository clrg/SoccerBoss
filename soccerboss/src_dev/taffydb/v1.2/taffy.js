/*

Software License Agreement (BSD License)
http://taffydb.com
Copyright (c) 2008
All rights reserved.
Version 1.2


Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


SUMMARY:
TAFFY takes a JavaScript object and returns a set of methods
to search, modify, and manipulate that object.


* TODO: OR handling in find methods?
* TODO: Optional Indexes?
* TODO: some() check? (some records match the find filter, true/false)
* TODO: every() check? (all records match the find filter, true/false)


*/


// Setup TAFFY Function (nameSpace) to return an object with methods. 

if (!this.TAFFY) {

TAFFY = function (obj) {
	var raw = (TAFFY.isString(obj)) ? TAFFY.JSON.parse(obj) : obj;
   	var TAFFYObj = raw;
	
	// ****************************************
    // *
    // * Create prvate findTests Object
    // * Collect all possible true/false expression used when
	// * doing lookups via the public find method.
    // * Purpose: Used to house and document all of the
	// * possible ways to match a value to a field with the
	// * TAFFY Object. Each of the contained functions does an
	// * evaluation against a value from the TAFFY Obj and a test
	// * provided by the caller of the find method. If this
	// * evaluation is true then the find method will add
	// * the TAFFY Object record to the results set.
    // *
    // ****************************************
    
	var t = true, f=false;
	
	
	var findTests = {
								
								regexppass:function (mvalue,mtest)
								{
									// If a value matches a provided regular expression
									return (mtest.test(mvalue)) ? t : f;
								},
								regexpfail:function (mvalue,mtest)
								{
									// If a value does not match a provided regular expression
									return (!mtest.test(mvalue)) ? t : f;
								},
								lessthan:function (mvalue,mtest)
								{
									// If a value is less than a provided number
									return (mvalue < mtest) ? t : f;
								},
								greaterthan:function (mvalue,mtest)
								{
									// if a value is greater than a provided number
									return (mvalue > mtest) ? t : f;
								},
								startswith:function (mvalue,mtest)
								{
									// If a value starts with a provided string
									return (mvalue.indexOf(mtest) === 0) ? t : f;
								},
								endswith:function (mvalue,mtest)
								{
									// If a value ends with a provided string
									return (mvalue.substring((mvalue.length - mtest.length)) == mtest) ? t : f;
								},
								like:function (mvalue,mtest)
								{
									// If a value contains the provided substring
									return (mvalue.indexOf(mtest) >= 0) ? t : f;
								},
								notlike:function (mvalue,mtest)
								{
									// If a value does not contain a provided substring
									return (mvalue.indexOf(mtest) === -1) ? t : f;
								},
								equal:function (mvalue,mtest)
								{
									// If a value and a provided string or number are equal
									return (mvalue == mtest) ? t : f;
								},
								notequal:function (mvalue,mtest)
								{
									// If a value and a provided string or number are not equal
									return (mvalue != mtest) ? t : f;
								},
								arraycontains:function (mvalue,mtest)
								{
									 // If a provided value is found within an array of values
									
									 if (TAFFY.isArray(mvalue))
											{
												// If the value is an array, loop over the records
												// and compare each against the test. If any match
												// return true;
												for(var TAFa = 0; TAFa < mvalue.length; TAFa++)
												{
													if (mvalue[TAFa] == mtest)
														return t;
												}
											} else {
												// Value is not an array compare the value and the test
												// and return true if they match.
                                            	if (mvalue == mtest)
                                                	return t;
                                        
                                    }
									// If nothing has returned true by this point, return false.
									return f;
								}
								
								};
	
	
	// ****************************************
    // *
    // * Create prvate makeIndexArray method
    // * Return an array of indexes
    // * Purpose: Used to create a variable that is an
	// * array that contains the indexes of the records
	// * that an action should be taken on. If a single
	// * number is passed then an array is created with that
	// * number being in postion 0. If an array is passed
	// * in then that array is returned. If no value is
	// * passed in then an array containing every index
	// * in the TAFFY Obj is returned. If an object is passed
	// * then a call to the find function is made and the
	// * resulting array of indexes returned.
    // *
    // ****************************************
    
    var makeIndexArray = function (iA,finderFunc) {
		var rA = [];
        if (!TAFFY.isArray(iA) && TAFFY.isNumber(iA)) 
			{
                rA[rA.length] = iA;
            } 
		else if (TAFFY.isArray(iA))
           {
               rA = iA;
                    
           }
		else if (TAFFY.isObject(iA))
		   {
				rA = finderFunc(iA);			
		   }
		else if (!TAFFY.isArray(iA) && !TAFFY.isNumber(iA))
           {
                for(var miAd = 0; miAd < TAFFYObj.length; miAd++) {
                    rA[rA.length] = miAd;
                }
                    
           }
		 return rA;
    };
    
	// ****************************************
    // *
    // * Create private toLogicalArray method
    // * return custom array for use in array.sort based on sort obj
    // * argument
    // * Purpose: This is used by the buildSortFunction function in the case
	// * of logical and logicaldesc sort types. This function splits a complex
	// * value into an array so that each array item can be compared against
	// * the item at the index in each value.
	// *
    // ****************************************
	var toLogicalArray = function (value) {
		var rArray = [0],type = "none";
		for(var n = 0;n<value.length;n++)
		{
			var c = value.slice(n,(n+1));
			if (TAFFY.IsNumeric(c)) {
				if (type != 'number') {
					rArray[rArray.length] = c;
					type = 'number';
				} else {
					rArray[(rArray.length-1)] = rArray[(rArray.length-1)] + "" + c;
				}
			} else {
				if (type != 'string') {
					rArray[rArray.length] = c;
					type = 'string';
				} else {
					rArray[(rArray.length-1)] = rArray[(rArray.length-1)] + c;
				}
			}
			
		}
		for(var n = 0;n<rArray.length;n++)
		{
			if (TAFFY.IsNumeric(rArray[n])) {
				rArray[n] = parseFloat(rArray[n]);
			}
		}
		
		return rArray;
	};
	
    // ****************************************
    // *
    // * Create private buildSortFunction method
    // * return custom sort function for use in array.sort based on sort obj
    // * argument
    // * Purpose: This is used by the orderBy method to create a custom sort
    // * function for use with array.sort(). This sort function will be unique
    // * based on the field list supplied in the sortobj argument.
    // *
    // ****************************************
    var buildSortFunction = function (sortobj) {
        var custO = [],localO = [];
        
        if (TAFFY.isString(sortobj))
        {
		    localO[0] = sortobj;
        } else if (TAFFY.isObject(sortobj)) {
			localO = [sortobj];
		} else {
            localO = sortobj;
        }
        
        // create the custO which contains instructions
        // for the returned sort function
        if (TAFFY.isArray(localO)) {
            for(var sa = 0; sa < localO.length; sa++) {
                if (TAFFY.isString(localO[sa]))
                    {
                    if (TAFFY.isString(TAFFYObj[0][localO[sa]]))
                        {
                            custO[custO.length] = {sortCol : localO[sa], sortDir : "asc", type : "string"};
                        } else {
                            custO[custO.length] = {sortCol : localO[sa], sortDir : "asc", type : "number"};
                        }
                    } else if (TAFFY.isObject(localO[sa])) {
						for(var sc in localO[sa])
						{
						
                        	if (TAFFY.isString(TAFFYObj[0][localO[sa].sortCol]))
                        	{
                            	custO[custO.length] = {sortCol : sc, sortDir : localO[sa][sc], type : "string"};
                        	} else {
                            	custO[custO.length] = {sortCol : sc, sortDir : localO[sa][sc], type : "number"};
                        	}
                        	
						}
                    }
            }
        };
        
        // Return the sort function to the calling object.
        return function (a,b) {
            var returnvar = 0,r1=a,r2=b,x,y;
            
            // loop over the custO and test each sort
            // instruction set against records x and y to see which
            // should appear first in the final array sort
            for(var sa = 0; sa < custO.length; sa++) {
                if (returnvar === 0) {
				
                x = r1[custO[sa]["sortCol"]];
                y = r2[custO[sa]["sortCol"]];
                
                if (custO[sa].type == 'string'){
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }
    
                if (custO[sa].sortDir == 'desc')
                {
                    if (x > y) {
                        returnvar = -1;
                    } else if (x < y){
                        returnvar = 1;
                    }
                } else if (custO[sa].sortDir == 'logical') {
					x = toLogicalArray(x);
                    y = toLogicalArray(y);
					
					for(var z = 0;z<y.length;z++)
					{
						if (x[z] < y[z] && z < x.length) {
                       		//alert(x[z] + "" + y[z] + "ss");
							returnvar = -1;
							break;
                   		} else if (x[z] > y[z]){
                        	returnvar = 1;
							break;
                    	}
					}
					if (x.length < y.length && returnvar==0)
					{
						returnvar = -1;
					} else if (x.length > y.length && returnvar==0) {
						returnvar = 1;
					}
				} else if (custO[sa].sortDir == 'logicaldesc') {
					x = toLogicalArray(x);
                    y = toLogicalArray(y);
					for(var z = 0;z<y.length;z++)
					{
						if (x[z] > y[z] && z < x.length) {
                        	returnvar = -1;
							break;
                   		} else if (x[z] < y[z]){
                        	returnvar = 1;
							break;
                    	}
					}
					if (x.length < y.length && returnvar==0)
					{
						returnvar = 1;
					} else if (x.length > y.length && returnvar==0) {
						returnvar = -1;
					}
				} else {
					if (x < y) {
                        returnvar = -1;
                    } else if (x > y){
                        returnvar = 1;
                    }
                }
                
                }
            
            };
            return returnvar;
        
        };
    
    };

	 // ****************************************
    // *
    // * Return Obj containing Methods
    // *
    // ****************************************
    return {
	
	// ****************************************
    // *
    // * This is a raw (unmodifed) copy of the obj
	// * that was passed into TAFFY() on creation;
    // *
    // ****************************************
    raw:raw,
	
	// ****************************************
    // *
    // * This is the length of the current TAFFY Obj.
    // *
    // ****************************************
    length:TAFFYObj.length,

    
	// ****************************************
    // *
    // * This is the date of the last change
	// * to the TAFFY object.
    // *
    // ****************************************
   	lastModifyDate:new Date(),
	
    // ****************************************
    // *
    // * Create public find method
    // * Returns array of index numbers for matching array values
    // * Purpose: This takes an obj that defines a set of match
    // * cases for use against the TAFFYObj. Matching indexes are
    // * added to an array and then returned to the user. This is the
    // * primary "lookup" feature of TAFFY and is how you find individual
    // * or sets of records for use in update, remove, get, etc.
    // *
    // ****************************************
    find : function (matchObj,findFilter) {
	
	
        // define findMatches array and findMatchesLoaded flag
        var findMatches = [],findMatchesLoaded = 0,findIndex = 0;
        
        // loop over attributes in matchObj
        for (var mi in matchObj){ 
        
            // default matchType, matchValue, matchField
            var matchType = 'equal',matchValue = '',matchField = mi;
			
            // If the matchObj attribute is an object
            if (TAFFY.isObject(matchObj[mi]))
            {
                // loop over match field attributes
                for (var fi in matchObj[mi]){ 
                    
                    // switch over attributes, extract data
                    switch (fi) {
                                case 'equal' :
								case 'is' :
									matchType = 'equal';
								break;
								
								case 'notequal' :
								case 'not' :
									matchType = 'notequal';
								break;
								
                                case 'startswith' :
								case 'starts' :
									matchType = 'startswith';
								break;
                                case 'endswith' :
								case 'ends' :
									matchType = 'endswith';
								break;
                                case 'greaterthan' :
								case 'gt' :
									matchType = 'greaterthan';
								break;
                                case 'lessthan' :
								case 'lt' :
									matchType = 'lessthan';
								break;
								case 'regexppass' :
								case 'regex' :
									matchType = 'regexppass';
								break;
								case 'regexpfail' :
									matchType = 'regexpfail';
								break;
                                case 'arraycontains' :
								case 'contains' :
									matchType = 'arraycontains';
								break;
                                case 'like' :
								 case 'notlike' :
								
                                   matchType = fi;
                                break;
                                default :
                                    // default to exact if it doesn't match anything else
                                    // FEATUREADD: This should fail instead.
                                    matchType = 'equal';
                                break;
                            }
                    
      				matchValue = matchObj[mi][fi];
                }
            }
            // If the matchObj attribute is not an object
             else
            {
                // set the match value to the value provided
                matchValue = matchObj[mi];
            }
                
                // if it isn't currently populated, populate findMatches with 
                // every index in the json array. Indexes that do not match the search
                // are then removed from this array.
				// if findFilter was supplied as part of the call use that
				// array instead of every index
                if (findMatchesLoaded == 0) {
					if (TAFFY.isArray(findFilter)) {
						findMatches = findFilter;
					} else  {
                    	for(var fd = 0; fd < TAFFYObj.length; fd++) {
                        	findMatches[findMatches.length] = fd;
                    	}
					}
                    findMatchesLoaded = 1;
					
                }
                
                
                //define thisMatchArray for this find method
                var thisMatchArray = [];
                
                    // loop over every element in the findMatches
                       for(var d = 0; d < findMatches.length; d++) {
					   	
                                    // if the value is an array of values, loop rather than do 1 to 1
                                    if (TAFFY.isArray(matchValue))
                                    {
										// call the correct filter based on matchType and add the record if the filter returns true
                                        for(var md = 0; md < matchValue.length; md++) {
                                            if (findTests[matchType](TAFFYObj[findMatches[d]][matchField],matchValue[md])) {
                                                thisMatchArray[thisMatchArray.length] = findMatches[d];
                                                
                                            }
                                        }
                                    } 
                                    // if the value is not an array but a single value
                                    // If an exact match is found then add it to the array
                                    else if (findTests[matchType](TAFFYObj[findMatches[d]][matchField],matchValue))
                                    {
										thisMatchArray[thisMatchArray.length] = findMatches[d];
                                        
                                    }				
                    }
                
               findMatches = thisMatchArray;
        };
        
		// Garther only unique finds
		findMatches = TAFFY.gatherUniques(findMatches);

        return findMatches;
    },
    
    // ****************************************
    // *
    // * Create public remove method
    // * Purpose: This is used to remove a record from
    // * the TAFFYObj by an index or an array of indexes.
    // *
    // ****************************************
    remove : function (removeIndex) {
        	
            var removeIndex = makeIndexArray(removeIndex,this.find);
			
            // loop over removeIndex and set each record to remove
            // this is done so all records are flagged for remove
            // before the size of the array changes do to the splice
            // function below
            for(var di = 0; di < removeIndex.length; di++) {
				if (this.onRemove != null)
				{
					this.onRemove(TAFFYObj[removeIndex[di]]);
				}
                TAFFYObj[removeIndex[di]] = 'remove';
            }
			
			// nested function find delete
			var removeRemaining = function () {
				for(var tdi = 0; tdi < TAFFYObj.length; tdi++) {
           		 	if (TAFFYObj[tdi] === 'remove') {
                    	return t;
             		}
            	}
				return f;
			};
            
            // loop over TAFFYObj and remove all rows set to remove
            while (removeRemaining()) {
				for(var tdi = 0; tdi < TAFFYObj.length; tdi++) {
	                if (TAFFYObj[tdi] === 'remove') {
	                    TAFFYObj.splice(tdi,1);
						// update lastModifyDate
						this.lastModifyDate = new Date();
	                }
	            }
			}
			
			// Update Length
			this.length = TAFFYObj.length;
            return removeIndex;
    } ,
    

    
    
    // ****************************************
    // *
    // * Create public insert method
    // * Purpose: this takes an obj and inserts it into
    // * the TAFFY Obj array
    // *
    // ****************************************    
    insert : function (newRecordObj) {
        
		if (this.onInsert != null)
			{
				 this.onInsert(newRecordObj);
			} 
		
		
        // Do insert
        TAFFYObj[TAFFYObj.length] = newRecordObj;
		
		// update lastModifyDate
		this.lastModifyDate = new Date();
        
		// Update Length
		this.length = TAFFYObj.length;
		return [TAFFYObj.length-1];
    } ,
    
    // ****************************************
    // *
    // * Create public update method
    // * Purpose: This takes an obj of name/value
    // * pairs and then a set of 1 or more indexes
    // * and updates those records with in the TAFFYObj
    // *
    // ****************************************    
    update : function (updateObj,updateIndex) {
        	
            var updateIndex = makeIndexArray(updateIndex,this.find), updateCount=0;
			
            for(var d = 0; d < updateIndex.length; d++) {
              // set the updatedex
              updateDex = updateIndex[d];
              
			  if (this.onUpdate != null)
				{
					this.onUpdate(updateObj,TAFFYObj[updateDex]);
				}
			            
              // Merge Objects
			  TAFFYObj[updateDex] = TAFFY.mergeObj(TAFFYObj[updateDex],updateObj);
                        
              // add the updaecount
              updateCount++;
			  
              }
        
			// Update Length
			this.length = TAFFYObj.length;
			return updateIndex;
        } ,
        
        
    // ****************************************
    // *
    // * Create public get method
    // * Purpose: This return an array containing
    // * the rows for a set of indexes. Used to get
    // * a record set with the help of the find
    // * function. Returns an empty array if
	// * no records are found.
    // *
    // ****************************************
    
    get : function (getIndex) {
        
         var newTAFFYArray = [];
            
         var getIndex = makeIndexArray(getIndex,this.find);
                
                // loop over all of the indexes
                for(var d = 0; d < getIndex.length; d++) {
                    
                    // add the TAFFYObj to the newTAFFYArray array
                    newTAFFYArray[newTAFFYArray.length] = TAFFYObj[getIndex[d]];
                }
        return newTAFFYArray;
    },
	
	// ****************************************
    // *
    // * Create public first method
    // * Purpose: This returns the first row
	// * from a set of indexes. Used to get
    // * a record with the help of the find
    // * function. Returns false if no records
	// * are found.
    // *
    // ****************************************
    
    first : function (getIndex) {
            
         var getIndex = makeIndexArray(getIndex,this.find);
                
         return (getIndex.length > 0) ? TAFFYObj[getIndex[0]] : false;
					
    },
	
	
	// ****************************************
    // *
    // * Create public last method
    // * Purpose: This returns the last row
	// * from a set of indexes. Used to get
    // * a record with the help of the find
    // * function. Returns false if no records
	// * are found.
    // *
    // ****************************************
    
    last : function (getIndex) {
        
         var getIndex = makeIndexArray(getIndex,this.find);
                
         return (getIndex.length > 0) ? TAFFYObj[getIndex[(getIndex.length - 1)]] : false;
    },
	
	// ****************************************
    // *
    // * Create public stringify method
    // * Purpose: This returns a string JSON array
	// * from a set of indexes. Used to get records
	// * for handling by AJAX or other langauges.
    // *
    // ****************************************
    
    stringify : function (getIndex) {
        
        return TAFFY.JSON.stringify(this.get(getIndex));
    },
    
    // ****************************************
    // *
    // * Create public orderBy method
    // * Purpose: Reorder the array according
    // * to a list of fields. Very useful for
    // * ordering tables or other types of
    // * sorting.
    // *
    // ****************************************
    orderBy : function (orderByObj) {
        
		// Only attempt to sort if there is a length
		// to the TAFFY array
		if (this.length > 0) {
        // Use the private buildSortFunction method
        // to create a custom sort function
		
        var customSort = buildSortFunction(orderByObj);
        
        // Call JavaScript's array.sort with the custom
        // sort function
        TAFFYObj.sort(customSort);
		
		// update lastModifyDate
		this.lastModifyDate = new Date();
        
		
		}
        },
        
    // ****************************************
    // *
    // * Create public forEach method
    // * Purpose: Loop over every item in a TAFFYObj
    // * (or at least the ones passed in the forIndex)
    // * and call the provided user created function.
    // *
    // ****************************************
    forEach : function (func2call,forIndex) {
        
        var forIndex = makeIndexArray(forIndex,this.find);
			
        var row;
        // loop over all of the indexes
            for(var fe = 0; fe < forIndex.length; fe++) {
                // get this row from the TAFFYObj
                 row = TAFFYObj[forIndex[fe]];
                // call the function passed in to the method
				var nr = func2call(row);
				
				// If nr is an object then set the row equal to the new object
				if (TAFFY.isObject(nr))
				{
					this.update(nr,forIndex[fe])
				}
            };
        
        },
		
		
	// ****************************************
    // *
    // * Empty On Update Event - This can be replaced with a function
	// * to call a custom action as each record is updated.
    // *
    // ****************************************
		onUpdate:null,
	
	// ****************************************
    // *
    // * Empty On Remove Event - This can be replaced with a function
	// * to call a custom action as each record is removed.
    // *
    // ****************************************
		onRemove:null,
		
	// ****************************************
    // *
    // * Empty On Insert Event - This can be replaced with a function
	// * to call a custom action as each record is inserted.
    // *
    // ****************************************
		onInsert:null
    
    };
    
};
	
	// ****************************************
    // *
    // * TAFFY Public Utilities
	// * Accessed via TAFFY.{methodname}()
    // *
    // ****************************************
	
	
	// ****************************************
    // *
    // * typeOf Fixed in JavaScript as public utility
    // *
    // ****************************************
	TAFFY["typeOf"] = function (v) {
    var s = typeof v;
    if (s === 'object') {
        if (v) {
            if (typeof v.length === 'number' &&
                    !(v.propertyIsEnumerable('length')) &&
                    typeof v.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
	};
	
	
	// ****************************************
    // *
    // * JSON Object Handler / public utility
    // * See http://www.JSON.org/js.html
    // * The following JSON Object is Public Domain
	// * No warranty expressed or implied. Use at your own risk.
    // *
    // ****************************************
	
	    TAFFY["JSON"] = function () {
	
	        function f(n) {
	            return n < 10 ? '0' + n : n;
	        }
	
	        Date.prototype.toJSON = function () {
	
	            return this.getUTCFullYear()   + '-' +
	                 f(this.getUTCMonth() + 1) + '-' +
	                 f(this.getUTCDate())      + 'T' +
	                 f(this.getUTCHours())     + ':' +
	                 f(this.getUTCMinutes())   + ':' +
	                 f(this.getUTCSeconds())   + 'Z';
	        };
	
	
	        var m = { 
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"' : '\\"',
	            '\\': '\\\\'
	        };
	
	        function stringify(value, whitelist) {
	            var a,i,k,l, r = /["\\\x00-\x1f\x7f-\x9f]/g,v;
	
	            switch (typeof value) {
	            case 'string':
	
	                return r.test(value) ?
	                    '"' + value.replace(r, function (a) {
	                        var c = m[a];
	                        if (c) {
	                            return c;
	                        }
	                        c = a.charCodeAt();
	                        return '\\u00' + Math.floor(c / 16).toString(16) +
	                                                   (c % 16).toString(16);
	                    }) + '"' :
	                    '"' + value + '"';
	
	            case 'number':
	
	                return isFinite(value) ? String(value) : 'null';
	
	            case 'boolean':
	            case 'null':
	                return String(value);
	
	            case 'object':
	
	                if (!value) {
	                    return 'null';
	                }
	
	                if (typeof value.toJSON === 'function') {
	                    return stringify(value.toJSON());
	                }
	                a = [];
	                if (typeof value.length === 'number' &&
	                        !(value.propertyIsEnumerable('length'))) {
	
	                    l = value.length;
	                    for (i = 0; i < l; i += 1) {
	                        a.push(stringify(value[i], whitelist) || 'null');
	                    }
	
	                    return '[' + a.join(',') + ']';
	                }
	                if (whitelist) {
	
	                    l = whitelist.length;
	                    for (i = 0; i < l; i += 1) {
	                        k = whitelist[i];
	                        if (typeof k === 'string') {
	                            v = stringify(value[k], whitelist);
	                            if (v) {
	                                a.push(stringify(k) + ':' + v);
	                            }
	                        }
	                    }
	                } else {
	
	                    for (k in value) {
	                        if (typeof k === 'string') {
	                            v = stringify(value[k], whitelist);
	                            if (v) {
	                                a.push(stringify(k) + ':' + v);
	                            }
	                        }
	                    }
	                }
	
	                return '{' + a.join(',') + '}';
	            }
	        }
	
	        return {
	            stringify: stringify,
	            parse: function (text, filter) {
	                var j;
	
	                function walk(k, v) {
	                    var i, n;
	                    if (v && typeof v === 'object') {
	                        for (i in v) {
	                            if (Object.prototype.hasOwnProperty.apply(v, [i])) {
	                                n = walk(i, v[i]);
	                                if (n !== undefined) {
	                                    v[i] = n;
	                                } else {
	                                    delete v[i];
	                                }
	                            }
	                        }
	                    }
	                    return filter(k, v);
	                }
	
	
	                if (/^[\],:{}\s]*$/.test(text.replace(/\\./g, '@').
	replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
	replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
	
	                    j = eval('(' + text + ')');
	
	                    return typeof filter === 'function' ? walk('', j) : j;
	                }
	
	                throw new SyntaxError('parseJSON');
	            }
	        };
	    }();
		
	
	// ****************************************
    // *
    // * End JSON Code Object Handler
    // *
    // ****************************************       
	
	// ****************************************
    // *
    // * Create public utility mergeObj method
    // * Return a new object where items from obj2
	// * have replaced or been added to the items in
	// * obj1
    // * Purpose: Used to combine objs
    // *
    // ****************************************   
	TAFFY["mergeObj"] = function (ob1,ob2) {
		for(var n in ob2)
		{
			if (ob2.hasOwnProperty(n))
			ob1[n] = ob2[n];
		}
		return ob1;
	};
	
	// ****************************************
    // *
    // * Create public utility gatherUniques method
    // * Return a new array with only unique
	// * values from the passes array
    // * Purpose: Used to get unique indexes for find
    // *
    // ****************************************   
	TAFFY["gatherUniques"] = function (a) {
		var uniques = [];
		for (var z = 0;z<a.length;z++)
			{
			var d = true;
			for (var c = 0;c<uniques.length;c++)
				{
					if (uniques[c] == a[z])
					d = false;
				}
			if (d == true)
			uniques[uniques.length] = a[z];
			}
		  return uniques;
		};
    
	// ****************************************
    // *
    // * Create public utility is[DataType] methods
    // * Return true if obj is datatype, false otherwise
    // * Purpose: Used to determine if arguments are of certain data type
    // *
    // ****************************************
	
	(function (ts) {
		for(var z = 0;z<ts.length;z++)
		{
			(function (y) {
				TAFFY["is" + y] = function (c) {
					return (TAFFY.typeOf(c) == y.toLowerCase()) ? true : false;
				}
			}(ts[z]))
		}
	} (["String","Number","Object","Array","Boolean","Null","Function","Undefined"])); 
	
	// ****************************************
    // *
    // * Create public utility isNumeric method
    // * Return ture if text of obj is made up solely of numbers, false otherwise
    // * Purpose: Used to determine if arguments are numbers
    // *
    // ****************************************
	TAFFY["IsNumeric"] = function (sT) {
   		var vC = "0123456789";
   		var IsN=true;
		for (var i = 0; i < sT.length && IsN == true; i++) 
		  { 
		  if (vC.indexOf(sT.charAt(i)) == -1) 
		     return false;
		  }
		return IsN;

   	};

}
