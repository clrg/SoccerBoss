/*

Software License Agreement (BSD License)
http://taffydb.com
Copyright (c) 2008
All rights reserved.



Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


SUMMARY:
TAFFY takes a JavaScript object and returns a set of methods
to search, modify, and manipulate that object.





*/


// Setup TAFFY Function (nameSpace) to return an object with methods. 

TAFFY = function (obj) {
    var raw = obj;
    var TAFFYObj = obj;
	
	
	// typeOf fixed in JavaScript
	function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}
	
	// ****************************************
    // *
    // * Create prvate isArray method
    // * Return true if obj is array, false otherwise
    // * Purpose: Used to determine if arguments are arrays
    // *
    // ****************************************
    
    var isArray = function (thing) {
        if (typeOf(thing) == 'array')
		{
			return true;
		} else {
			return false;
		}
    };
        
        
    // ****************************************
    // *
    // * Create private isObject method
    // * Return ture if obj is object, false otherwise
    // * Purpose: Used to determine if arguments are objects
    // *
    // ****************************************
    var isObject = function (thing) {
        if (typeOf(thing) == 'object')
		{
			return true;
		} else {
			return false;
		}
    };
    
    // ****************************************
    // *
    // * Create private isString method
    // * Return ture if obj is string, false otherwise
    // * Purpose: Used to determine if arguments are strings
    // *
    // ****************************************
    var isString = function (thing) {    
         if (typeOf(thing) == 'string')
		{
			return true;
		} else {
			return false;
		}
    };
    
    // ****************************************
    // *
    // * Create private isNumber method
    // * Return ture if obj is number, false otherwise
    // * Purpose: Used to determine if arguments are numbers
    // *
    // ****************************************
    var isNumber = function (thing) {
         if (typeOf(thing) == 'number')
		{
			return true;
		} else {
			return false;
		}
    };
	
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
    
	
	var findTests = {
								
								regexppass:function (mvalue,mtest)
								{
									// If a value matches a provided regular expression
									return (mtest.test(mvalue)) ? true : false;
								},
								regexpfail:function (mvalue,mtest)
								{
									// If a value does not match a provided regular expression
									return (!mtest.test(mvalue)) ? true : false;
								},
								lessthan:function (mvalue,mtest)
								{
									// If a value is less than a provided number
									return (mvalue < mtest) ? true : false;
								},
								greaterthan:function (mvalue,mtest)
								{
									// if a value is greater than a provided number
									return (mvalue > mtest) ? true : false;
								},
								startswith:function (mvalue,mtest)
								{
									// If a value starts with a provided string
									return (mvalue.indexOf(mtest) === 0) ? true : false;
								},
								endswith:function (mvalue,mtest)
								{
									// If a value ends with a provided string
									var start = mvalue.length - mtest.length;
									return (mvalue.substring(start) == mtest) ? true : false;
								},
								like:function (mvalue,mtest)
								{
									// If a value contains the provided substring
									return (mvalue.indexOf(mtest) >= 0) ? true : false;
								},
								notlike:function (mvalue,mtest)
								{
									// If a value does not contain a provided substring
									return (mvalue.indexOf(mtest) === -1) ? true : false;
								},
								equal:function (mvalue,mtest)
								{
									// If a value and a provided string or number are equal
									return (mvalue == mtest) ? true : false;
								},
								notequal:function (mvalue,mtest)
								{
									// If a value and a provided string or number are not equal
									return (mvalue != mtest) ? true : false;
								},
								arraycontains:function (mvalue,mtest)
								{
									 // If a provided value is found within an array of values
									
									 if (isArray(mvalue))
											{
												// If the value is an array, loop over the records
												// and compare each against the test. If any match
												// return true;
												for(var TAFa = 0; TAFa < mvalue.length; TAFa++)
												{
													if (mvalue[TAFa] == mtest) {
														return true;
													}
												}
											} else {
												// Value is not an array compare the value and the test
												// and return true if they match.
                                            	if (mvalue == mtest) {
                                                	return true;
                                                
                                            	}
                                        
                                    }
									// If nothing has returned true by this point, return false.
									return false;
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
    
    var makeIndexArray = function (indexArray,finderFunc) {
		var returnArray = [];
        if (isArray(indexArray) == 0 & isString(indexArray)) 
			{
                returnArray[returnArray.length] = indexArray;
            } 
		else if (isArray(indexArray) == 1)
           {
               returnArray = indexArray;
                    
           }
		else if (isObject(indexArray))
		   {
				returnArray = finderFunc(indexArray);		
		   }
		else if (isArray(indexArray) == 0 & isString(indexArray) == 0)
           {
                for(var miAd = 0; miAd < TAFFYObj.length; miAd++) {
                    returnArray[returnArray.length] = miAd;
                }
                    
           }
		 return returnArray;
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
        var customSortObj = [];
        var localSortObj = [];
        
        if (isString(sortobj))
        {
            localSortObj[0] = sortobj;
        } else {
            localSortObj = sortobj;
        }
        
        // create the customSortObj which contains instructions
        // for the returned sort function
        if (isArray(localSortObj)) {
            for(var sa = 0; sa < localSortObj.length; sa++) {
                if (isString(localSortObj[sa]))
                    {
                    if (isString(TAFFYObj[0][localSortObj[sa]]))
                        {
                            customSortObj[customSortObj.length] = {sortCol : localSortObj[sa], sortDir : "desc", type : "string"};
                        } else {
                            customSortObj[customSortObj.length] = {sortCol : localSortObj[sa], sortDir : "desc", type : "number"};
                        }
                    } else if (isObject(localSortObj[sa])) {
						for(var sc in localSortObj[sa])
						{
						
                        	if (isString(TAFFYObj[0][localSortObj[sa].sortCol]))
                        	{
                            	customSortObj[customSortObj.length] = {sortCol : sc, sortDir : localSortObj[sa][sc], type : "string"};
                        	} else {
                            	customSortObj[customSortObj.length] = {sortCol : sc, sortDir : localSortObj[sa][sc], type : "number"};
                        	}
                        	
						}
                    }
            }
        }
        
        // Return the sort function to the calling object.
        return function (a,b) {
            var returnvar = 0;            
            var r1=a;
            var r2=b;
			var x;
			var y;
            
            // loop over the customSortObj and test each sort
            // instruction set against records x and y to see which
            // should appear first in the final array sort
            for(var sa = 0; sa < customSortObj.length; sa++) {
                if (returnvar === 0) {
				
                x = r1[customSortObj[sa]["sortCol"]];
                y = r2[customSortObj[sa]["sortCol"]];
                
                if (customSortObj[sa].type == 'string'){
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }
    
                if (customSortObj[sa].sortDir == 'desc')
                {
                    if (x < y) {
                        returnvar = -1;
                    } else if (x > y){
                        returnvar = 1;
                    }
                } else {
                    if (x > y) {
                        returnvar = -1;
                    } else if (x < y){
                        returnvar = 1;
                    }
                }
                
                }
            
            }
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
        var findMatches = [];
        var findMatchesLoaded = 0;
        var findIndex = 0;
        
        // loop over attributes in matchObj
        for (var mi in matchObj){ 
        
            // default matchType, matchValue, matchField
            var matchType = 'equal';
            var matchValue = '';
            var matchField = mi;
			
            // If the matchObj attribute is an object
            if (isObject(matchObj[mi]))
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
					if (isArray(findFilter)) {
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
                                    if (isArray(matchValue))
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
        }
        
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
			
			if (this.onRemove != null)
			{
				 for(var d = 0; d < removeIndex.length; d++) {
				 	this.onRemove(TAFFYObj[removeIndex[d]]);
				 
				 }
			} 
			
            // loop over removeIndex and set each record to remove
            // this is done so all records are flagged for remove
            // before the size of the array changes do to the splice
            // function below
            for(var di = 0; di < removeIndex.length; di++) {
                TAFFYObj[removeIndex[di]] = 'remove';
            }
			
			// nested function find delete
			var removeRemaining = function () {
				for(var tdi = 0; tdi < TAFFYObj.length; tdi++) {
           		 	if (TAFFYObj[tdi] === 'remove') {
                    	return true;
             		}
            	}
				return false;
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
        
            var updateIndex = makeIndexArray(updateIndex,this.find);
			
			if (this.onUpdate != null)
			{
				 for(var d = 0; d < updateIndex.length; d++) {
				 	this.onUpdate(updateObj,TAFFYObj[updateIndex[d]]);
				 
				 }
			} 
			
            // loop over all the named values in the updateObj
            for (var ui in updateObj){ 
                	
                    var updateDex = 0;
                    var updateCount = 0;
                
                    // for each index in the update array  
                    for(var d = 0; d < updateIndex.length; d++) {
                        // set the updatedex
                        updateDex = updateIndex[d];
                        
                                // if the object attribute has a length
                                if (ui.length > 0) 
                                {
                                    // set the value to the array object attribute value
                                    TAFFYObj[updateDex][ui] = updateObj[ui];
									// update lastModifyDate
									this.lastModifyDate = new Date();
                                   }
                                
                            }
                        
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
        
         var newTAFFYRow = false;
            
         var getIndex = makeIndexArray(getIndex,this.find);
                
                // loop over all of the indexes
                for(var d = 0; d < getIndex.length; d++) {
                    
                    // add the TAFFYObj to the newTAFFYArray array
                    newTAFFYRow = TAFFYObj[getIndex[d]];
					break;
                }
        return newTAFFYRow;
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
				if (isObject(nr))
				{
					TAFFYObj[forIndex[fe]] = nr;
				}
            }
        
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