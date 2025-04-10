//This array is used to build our filter's buttons
const filters = new Array("All", "To do", "Done");
//We then create an empty variable that will later be set to our current selected filter.
let selectedFilter;

/**
 * This function is called when our page's body is fully loaded.
 * Our filters and interface are initialized by it.
 */
function Init() {
	buildFilters();
	initInterface();
}

/**
 * Build our filter's buttons with our "filters" array variable
 */
function buildFilters() {
	//We first obtain our container element from our html by his ID.
	const CONTAINER = document.getElementById("filtersContainer");
	//Then, for each filter, we create a new button
	for (let filter in filters) {
		const newButton = document.createElement("button");
		//! Don't forget that we remove any white spaces from our filter's name to set it as our button's ID.
		newButton.id = filters[filter].replace(" ", "");
		newButton.innerText = filters[filter];
		newButton.onclick = function (e) {
			//We set our button (using this) as a parameter to later obtain his ID, aka, our selected filter's name WITHOUT SPACES.
			return updateFilters(this);
		};
		//Finally, we append our new button to our container.
		CONTAINER.appendChild(newButton);
	}
}
