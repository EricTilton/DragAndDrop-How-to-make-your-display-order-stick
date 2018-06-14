# Dragula-FAQ-example
A tool for Site Administrators to drag and drop there Frequently asked questions in the specific order they choose and have there changes stick utilizing react-dragula, and a user defined table within SQL Server Management Studio.

![Alt Text](https://media.giphy.com/media/1wX9bI6KabpmF9F2x3/giphy.gif)
<br/>
<br/>
<br/>
Once you create your User Defined Table under User defined table types you can begin sending arrays of display order numbers to your database. 
<br/>
<br/>
<br/>
<a href="https://ibb.co/d7wmZd"><img src="https://preview.ibb.co/nzLDEd/User_Defined_table.png" alt="User_Defined_table" border="0"></a>
<br/>
<br/>
<br/>
<br/>
The Dragula Decorator function utilizes the "target" parameter to collect data from each mapped out object within its specific category grabbing the index number and id of each question in the list and placing it in the array called "changes". Thus it splices this array into arrays containing only the id and display order number of each FAQ and is looped through the axios call "UpdateDisplayOrder" which uses the user defined table to update each and every FAQ within the list with its specific index number as soon as the onDrop occurs. 

<a href="https://ibb.co/iwfKny"><img src="https://preview.ibb.co/cXbs7y/Dragula_Decorator.png" alt="Dragula_Decorator" border="0"></a>
