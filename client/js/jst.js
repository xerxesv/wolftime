window.JST = {};

window.JST['formTemplate'] = _.template('<div id="formDiv"><p>You can <%= action %> your wolfman and <%= string %></p><p><input class="username" type="text" id="username" placeholder="Wolfman"s name"></p><p><input class="password" type="text" id="password" placeholder="Yr password"></p><button id="submit">Submit</button> <a href="#a" id="cancel">Cancel</a></div>');


window.JST['savedTemplate'] = _.template(' <div> <p> You have successfully saved your ferocious fursona! Copy and paste this code to share your amazing creation on your favorite social media platform. </p> <p> <textarea> <%= imgURL %> </textarea> </p> <p> You can <a href="#">keep playing wth your furry</a> or <a href="">start fresh.</a> (You can log in with the same name/password to modify your guy later.) </p> </div>');