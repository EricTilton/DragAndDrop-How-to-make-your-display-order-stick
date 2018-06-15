# DragAndDrop-How-to-make-your-display-order-stick
This example shows a list of FAQs that can be dragged and dropped in a specific order and have there changes actually stay. It utilizes a user defined table created in SQL Server and the referenced function "Dragula Decorator" to accomplish this. 
![Alt Text](https://media.giphy.com/media/1wX9bI6KabpmF9F2x3/giphy.gif)
<br/>
<br/>
<br/>
Once you create your User Defined Table under User defined table types you can begin sending arrays of display order numbers to your database. 
<br/>
<br/>
<br/>
<a href="https://imgbb.com/"><img src="https://image.ibb.co/ipkihy/FAQ_table.png" alt="FAQ_table" border="0"></a>
<a href="https://ibb.co/d7wmZd"><img src="https://preview.ibb.co/nzLDEd/User_Defined_table.png" alt="User_Defined_table" border="0"></a>
<br/>
<br/>
<br/>
<br/>
The Dragula Decorator function utilizes the "target" parameter to collect data from each mapped out object referencing it. It grabs the index number and Id of each question in the list and placing it in the array called "changes". Thus it splices this array into arrays containing only the Id and display order number of each FAQ and is looped through the axios call "UpdateDisplay" which uses the user defined table to update each and every FAQ within the list with its specific index number as soon as the FAQ is dropped in its new order. 

<a href="https://ibb.co/iwfKny"><img src="https://preview.ibb.co/cXbs7y/Dragula_Decorator.png" alt="Dragula_Decorator" border="0"></a>
