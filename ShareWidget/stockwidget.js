/* 
 * Name: Eunice Llobet
 * ID: 1330233 
 */

/*
 * Constructor function for a StockWidget instance.
 * 
 * container_element : a DOM element inside which the widget will place its UI
 *
 */
 
function StockWidget(container_element){

    //Default sort order
    var _sortOrder = 0;
    //List of company names selected to display
    var companyList = [];

	//declare an inner object literal to represent the widget's UI
    UIproperties = {
        toolbarSelect: null,
       	labelSelect: null,
       	selectTag: null,
       	optionTag: null,
        companyName: null,
        addOption: null,

       	toolbarRadio: null, 
       	labelRadioButtons: null,
       	labelRadioCompany: null,
       	labelRadioPrice: null,
       	inputCompany: null,
       	inputPrice: null, 

        labelBar: null, 
        labelCompany: null,
        labelPrice: null, 
        labelMovement: null,

        stockList: null

    };
	
	
    //write a function to create and configure the DOM elements for the UI
    //this will be explicitly called when the object is created to make it visible
    var _createUI = function(container_element){

        /*
         * Get the list of company names from the database
         * Display in the dropdown list
         */

        var getCompanyOptions = function() {
            //Get list of companies from the database using php
            var url = "php/companyOptions.php";
            //Call ajax function
            ajaxRequest(url, "GET", "", displayOptions);
        };

        //Callback method for getCompanyOptions
        var displayOptions = function(response) {    
            //Store list of company names
            var companyOptions = [];

            for(var i = 0; i < response.length; i++) {
                companyOptions.push(response[i].name);
            }

            //Access array and create a new option element for each name
            for(var i = 0; i < companyOptions.length; i++) {
                UIproperties.addOption = document.createElement("option");
                UIproperties.addOption.innerHTML = companyOptions[i];
                UIproperties.selectTag.appendChild(UIproperties.addOption);
            } 

        } /* END */
        
        //create each of the DOM elements (dropdown list, divs, spans, etc)
        //these will need to be added the container_element which is the div passed in as a parameter to the constructor function by the html page

        //Create drop down list elements
        UIproperties.toolbarSelect = document.createElement("div");
        UIproperties.toolbarSelect.id = "toolbarSelect";

        	UIproperties.labelSelect = document.createElement("label");
        	UIproperties.labelSelect.innerHTML = "Select Company ";

        	UIproperties.selectTag = document.createElement("select");
        	UIproperties.optionTag = document.createElement("option");
        	UIproperties.optionTag.innerHTML = "Select a Company";
            UIproperties.optionTag.hidden = "true";
            UIproperties.selectTag.appendChild(UIproperties.optionTag);

            //Call method to display company names as options
            getCompanyOptions();

        //Add elements to toolbar to group them
        UIproperties.toolbarSelect.appendChild(UIproperties.labelSelect);
        UIproperties.toolbarSelect.appendChild(UIproperties.selectTag);


        //Create radio button elements
        UIproperties.toolbarRadio = document.createElement("div");
        UIproperties.toolbarRadio.id = "toolbarRadio";

        	UIproperties.labelRadioButtons = document.createElement("label");
        	UIproperties.labelRadioButtons.innerHTML = "Sort by: ";

        	//Create each sort by name radio button
        	UIproperties.inputCompany = document.createElement("input");
        	UIproperties.inputCompany.id = "radioCompany";
        	UIproperties.inputCompany.type = "radio";
        	UIproperties.inputCompany.name = "sortBy";
        	UIproperties.inputCompany.value = "company";

            //Check if this radio button is checked
            UIproperties.inputCompany.onclick = function() {
                _doSort(0);
            }

        	//Create label for sort by name radio button
        	UIproperties.labelRadioCompany = document.createElement("label");
        	UIproperties.labelRadioCompany.for = "radioCompany";
        	UIproperties.labelRadioCompany.innerHTML = "Company ";


        	//Create sort by price radio button
        	UIproperties.inputPrice = document.createElement("input");
        	UIproperties.inputPrice.id = "radioPrice";
        	UIproperties.inputPrice.type = "radio";
        	UIproperties.inputPrice.name = "sortBy";
        	UIproperties.inputPrice.value = "price";

            UIproperties.inputPrice.onclick = function() {
                _doSort(1);
            }  

        	//Create label for sort by price radio button
        	UIproperties.labelRadioPrice = document.createElement("label");
        	UIproperties.labelRadioPrice.for = "radioPrice";
        	UIproperties.labelRadioPrice.innerHTML = "Price ";


        //Add components of radio buttons to group them
        UIproperties.toolbarRadio.appendChild(UIproperties.labelRadioButtons);
        UIproperties.toolbarRadio.appendChild(UIproperties.inputCompany);
        UIproperties.toolbarRadio.appendChild(UIproperties.labelRadioCompany);
        UIproperties.toolbarRadio.appendChild(UIproperties.inputPrice);
        UIproperties.toolbarRadio.appendChild(UIproperties.labelRadioPrice);


        //Create stock line elements
        UIproperties.labelBar = document.createElement("div");

        	//Create lables for each columns: company name, price, movement
        	UIproperties.labelCompany = document.createElement("span");
       	 	UIproperties.labelCompany.innerHTML = "Company:";
            UIproperties.labelCompany.className = "column1";
            UIproperties.labelCompany.id = "labelCompany";

        	UIproperties.labelPrice = document.createElement("span");
        	UIproperties.labelPrice.innerHTML = "Price:";
            UIproperties.labelPrice.className = "column2";

        	UIproperties.labelMovement = document.createElement("span");
        	UIproperties.labelMovement.innerHTML = "+/-:";
            UIproperties.labelMovement.className = "column3";


        	//Add labels to group them 
        	UIproperties.labelBar.appendChild(UIproperties.labelCompany);
         	UIproperties.labelBar.appendChild(UIproperties.labelPrice);
        	UIproperties.labelBar.appendChild(UIproperties.labelMovement);


        //Create container to hold stock line elements - pass this as parameter to stockline object
        UIproperties.stockList = document.createElement("div");

       	
        //Add toolbars and containers to widget container
        container_element.appendChild(UIproperties.toolbarSelect);
        container_element.appendChild(UIproperties.toolbarRadio);
        container_element.appendChild(UIproperties.labelBar);
        container_element.appendChild(UIproperties.stockList);

 
        //Display selected company name with its price and movement on select.
        UIproperties.selectTag.onchange = function() {
            getSelectedName(UIproperties.selectTag);
        }
    };


	// add any other methods required for the functionality to get stock data using AJAX
    // your callback function should create an instance of the StockLine object to store and 
    // display the information returned

	//Ajax request function
    var ajaxRequest = function(url, method, data, callback) {
        var request = new XMLHttpRequest();
        request.open(method, url, true);

        if (method == "POST") {
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        request.onreadystatechange = function() {
            //If request is ready to process
            if (request.readyState === 4) {
                //And if request is successful
                if (request.status === 200) {
                    //Get response with JSON
                    var response = JSON.parse(request.responseText);
                    callback(response);
                } 
                else {
                    handleError(request.statusText);
                }
            }
        }
        request.send(data);
    };

    //Ajax error handling
	var handleError = function(errorText) {
		alert("An error occurred: " + errorText);
	};

    /*
     * Get selected company name from drop down list
     * Send name to php to get details 
     * Show in Stock line
     */
    var getSelectedName = function(dropdown) {
        //Get value from select tag
        var data = "companyName=" + dropdown.options[dropdown.selectedIndex].value;
        //Send data to php
        var url = "php/stock.php";
        ajaxRequest(url, "POST", data, displayCompanyName);
    };

    //Callback function
    var displayCompanyName = function(response) {

        //Object literal for properties
        var dbProperties = {
            name: response.name,
            price: response.price,
            movement: response.movement
        };

        for(var i = 0; i < companyList.length; i++) {
            if(companyList[i].getName() == dbProperties.name) {
                alert("Company Name already added.");
                return;
            }
        }

        var stock = new StockLine(UIproperties.stockList, dbProperties.name, dbProperties.price, dbProperties.movement);
        companyList.push(stock);
    };


    //you will need to define comparator functions to be used with your sort for radio buttons

    //Assign number to variable to determine sort
    var _doSort = function(sortBy) {
        if(sortBy == 0) {
            _sortOrder = 0;
        }
        else if(sortBy == 1) {
            _sortOrder = 1;
        }

        _display();
    };


    /*
	 * sort comparator function
	 * if the first argument is bigger, stay in position
	 * if the second argument is bigger, it should be placed before the first argument
	 * if both arguments are equal stay as it is
	 * (doesn't check case)
     */
    var _nameSort = function(a, b) {
        if(a.getName() > b.getName()) {
            return 1;
        }
        else if(a.getName() < b.getName()) {
            return -1;
        }
        else 
            return 0;
    }

    //returns are the same as nameSort
    var _priceSort = function(a,b) {
        return a.getPrice() - b.getPrice();
    }


    /*
	 * Removes everything and redisplay is determined by sorting
	 * Sort checks variable if 1 or 0, and determines which sort to do
	 * Redisplay is by adding elements of stockline back into container
     */
    var _display = function() {

        //If nothing in the list, return
        if(UIproperties.stockList == null) return;

        //Remove everything in the div
        while(UIproperties.stockList.hasChildNodes()) { 
            UIproperties.stockList.removeChild(UIproperties.stockList.lastChild);
        }

        //Order data correctly
        if(_sortOrder == 0) {
            companyList.sort(_nameSort);
        }
        else if(_sortOrder == 1) {
            companyList.sort(_priceSort);
        }

        //Add items back to UI 
        for(var i = 0; i < companyList.length; i++) {
            var sLine = companyList[i];
            UIproperties.stockList.appendChild(sLine.getSection());
        }
    };


	/*
	 * private method to intialise the widget's UI on start up
	 * this method is complete
	 */
	var _initialise = function(container_element) {
	  	_createUI(container_element);
        _display();
	};

	  	
	/*********************************************************
	* Constructor Function for the inner StockLine object to hold the 
	* full stock data for a company
	********************************************************/
	
	var StockLine = function(container, name, price, movement){
		
		//declare the data properties for the object and its UI
        var _container = container;
        var _name = name;
        var _price = price;
        var _movement = movement;

		//declare an inner object literal to represent the widget's UI
        //write a function to create and configure the DOM elements for the UI

        //An object literal defining the stock line's UI - doesn't work
        /*lineUI = {
            name_label: null,
            price_label: null,
            movement_label: null,
            section: null
        };*/

        //Declaring properties for UI 
        var name_label;
        var price_label;
        var movement_label;
        var section;
		
		
		//write a function to create and configure the DOM elements for the UI
        var _createUI = function() {

			//Create container of each line
            section = document.createElement("div");
            section.id = "section";

            //Create company name'column'
            name_label = document.createElement("span");
            name_label.id = "companyName";
            name_label.className = "column1";
            name_label.innerHTML = _name;

            //Create price 'column'
            price_label = document.createElement("span");
            price_label.id = "price";
            price_label.className = "column2";
            price_label.innerHTML = "$" + _price;

            //Create movement 'column'
            movement_label = document.createElement("span");
            movement_label.id = "movement";
            movement_label.className = "column3";
            movement_label.innerHTML = _movement;

            //Add elements into line container
            section.appendChild(name_label);
            section.appendChild(price_label);
            section.appendChild(movement_label);

            //Add line into bigger container
            _container.appendChild(section);


        };
		
		//Add any remaining functions you need for the object, like setters and getters
        //You will need a getter function for the DOM element containing all of the ui
        //elements you create in _createUI so that the outer widget can add it to its
        //own ui 
 
        this.getName = function() {
            return _name;
        };

        this.getPrice = function() {
            return _price;
        };

        this.getSection = function() {
            return section;
        };

        this.getContainer = function() {
            return _container;
        };

		//_createUI() method is called when the object is instantiated
		_createUI();
	 
  	};  //this is the end of the constructor function for the StockLine object 

	
	//  _initialise method is called when a StockWidget object is instantiated
	_initialise(container_element);

}
	 
//end of constructor function for StockWidget 	 
	 
	 