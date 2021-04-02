const form = document.getElementById('newRecipe');
const markup = document.getElementById('markup');
const filename = document.getElementById('filename');

form.addEventListener('submit', function(event){
    event.preventDefault();
    
    let formData = Object.fromEntries(new FormData(event.target));
    console.log(formData);
    debugger;
    GenerateMarkup(formData);
});

markup.addEventListener('click', function(event){
    this.select();
});

function GenerateMarkup(recipe){
    markup.value = 
`# ${recipe.title}
Author: ${recipe.author}  

${recipe.description}  

Serves: ${recipe.servings}  
Time: ${recipe.time}  
Tags: ${recipe.tags}

## Ingredients
${LinesToList(recipe.ingredients, "-")}

## Directions
${LinesToList(recipe.directions, "1")}

### Notes
${recipe.notes}

Source: [${recipe.sourceName}](${recipe.sourceUrl})`

    filename.innerHTML = `<code>${recipe.title.toLowerCase().replaceAll(" ", "-")}.md</code>`
};


function LinesToList(lines, delimeter){
    console.log(typeof(lines));
    // split lines by newline char
    let splitLines = lines.split("\n");
    console.log(typeof(splitLines));
    console.log(Array.isArray(splitLines));

    //remove empty lines

    // loop through lines and add the delimiter prefix
    splitLines.forEach(function(item, i){
        splitLines[i] = `${delimeter == '-' ? '-' : `${i + 1}.` } ${item}`
    });

    // return lines as one string
    return splitLines.join("\n");
}


//TESTING STUFF
let testBtn = document.getElementById('testBtn');
testBtn.addEventListener('click', function(event){
    event.preventDefault();

    DummyData();
});

function DummyData(){
    let dummyRecipe =
    {
        "title": "Easy Queso Dip",
        "description": "A simple, quick and tasty queso dip.",
        "author": "Perry",
        "servings": "4-6",
        "time": "10 minutes",
        "tags": "appetizer, cheese",
        "ingredients": "8 oz. Velveeta cheese\n" + 
         "1 can Rotel tomatoes",
        "directions": "Cube the Velveeta into 1 inch cubes\n" +
         "Add the cubed cheese and can of Rotel to a medium-sized pot\n" + 
         "Cook on medium and stir occasionally until cheese is completely melted and dip is warm throughout\n" +
         "Serve immediately with tortilla chips",
        "notes": "You can add other additions to the dip, such as chopped chilies or jalapenos, or cooked ground beef.",
        "sourceName": "The Cheesy Place",
        "sourceUrl": "https://www.example.com/queso-dip"
    };

    for (let [key, value] of Object.entries(dummyRecipe)){
        form.elements[`${key}`].value = value;
    }

};