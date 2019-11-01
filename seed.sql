insert into forum
    (post, tag, date_posted, time_posted)
VALUES
    ('Hi. Thanks for visiting :)', 'pd17', '09/25/2019', '3:45:00 PM');

INSERT INTO users
    (first_name, last_name, email, password)
VALUES
    ('Test', 'Dummy', 'test@dummy.com', 'yes'),
    ('Eugene', 'Kim', 'ekim1707@gmail.com', '$2b$10$eUWfHGFKDowyp5O8xkAOfej5lL4DKirZh7xF6CgMYUxxovidewyuK');

insert into newsfeed
    (post, where_at, with_whom, timestamp_option, users_id)
VALUES
    ('UMBC Fall Concert was a blast!!! Thank you everyone who came out and supported us!!',
    'UMBC Dining Hall', 'Steve Yi, Mary Ahn, Eunsong Kim, Bryan Kim, Won-hyun Kim, and the rest of KCM',
    'College Days', 2),
    ('Hillsong Concert Atlanta 2019 turned out to be awesome. And I actually got to see my
    idol, Joel Houston, live in person for the first time! Grateful for the experience.',
    'State Farm Arena, Atlanta, GA', 'Tiffany Kim',
    'Summer 2019', 2),
    ('Anyone Down for a Trip? I found this picture a couple days ago and was thinking about trying to organize
    a trip somewhere tropical with anybody interested!!', 'not sure', 'open to anyone',
    'none', 2);

insert into connections
    (first_name, last_name, email, city, state_residing, favorite, available, users_id)
VALUES
    ('Tiffany', 'Kim', 'tomoyoiris@naver.com', 'Johns Creek', 'GA', true, true, 2),
    ('Charles', 'Cortez', 'cbc@ninja.com', 'Atlanta', 'GA', false, true, 2),
    ('Jonathan', 'Joe', 'jjoe@gmail.com', 'Peachtree Corners', 'GA', false, true, 2),
    ('Sangho', 'Kim', 'twelve@gmail.com', 'Olney', 'MD', false, false, 2),
    ('Gloria', 'Lee', 'gl0ria@yahoo.com', 'Ellicott City', 'MD', false, true, 2),
    ('Minje', 'Suh', 'minjesuh@gmail.com', 'Baltimore', 'MD', false, false, 2),
    ('Rowena', 'Bandigas', 'robandigas@gmail.com', 'Charlotte', 'SC', false, false, 2),
    ('Danny', 'Kim', 'dannykim@gmail.com', 'Lawrenceville', 'GA', false, true, 2),
    ('Hyeuryun', 'Kim', 'hyearyunkim@gmail.com', 'San Francisco', 'CA', false, false, 2),
    ('Tai', 'Nguyen', 'taiandpai@gmail.com', 'Columbia', 'MD', false, true, 2),
    ('Pailyn', 'Saengpet', 'pailynsoftvoice@gmail.com', 'Columbia', 'MD', false, true, 2),
    ('John', 'Smoltz', 'jsmoltz@gmail.com', 'Atlanta', 'GA', false, true, 1),
    ('Barry', 'Bonds', 'bonds@giants.com', 'San Fransisco', 'CA', false, true, 1),
    ('Chris', 'Rock', 'chris@gmail.com', 'Somewhere', 'NA', false, false, 1),
    ('Tom', 'Brady', 'goat@yahoo.com', 'Boston', 'MA', false, true, 1),
    ('Steve', 'Nash', 'nash@ball.com', 'Phoenix', 'AZ', false, false, 1),
    ('Stephen', 'Curry', 'curry@gsw.com', 'Oakland', 'CA', false, false, 1),
    ('Ray', 'Lewis', 'raylewis@ravens.com', 'Baltimore', 'MD', false, true, 1);

insert into quotebook
    (quote_type, quote, origin, significance, when_said, users_id)
VALUES
    ('Quotation', 'Speak softly and carry a big stick.', 'Theodore Roosevelt', 'From Mr. Sunshine drama', 'long time ago', 2),
    ('Song Lyric', 'Train roll on, on down the line, wont you please take me far away.', 'Lynyrd Skynyrd',
    'One of the true classics', 'Late 20th century', 2),
    ('Quotation',
    'Its a mind-blowing concept that the God who created the Universe might be looking for company,
    a real relationship with people...At the centre of all religions is the idea of Karma. You know,
    what you put out comes back to you; an eye for an eye, a tooth for a tooth...Its clear to me that
    Karma is at the very heart of the universe. Im absolutely sure of it. And yet, along comes this
    idea called Grace to upend all that "As you reap, so will you sow" stuff. Grace defies reason and
    logic. Love interrupts, if you like, the consequences of your actions, which in my case is very
    good news indeed, because Ive done a lot of stupid stuff. Thats between me and God. But Id be
    in big trouble if Karma was going to finally be my judge. Id be in deep s***. It doesn’t excuse
    my mistakes, but Im holding out for Grace. I’m holding out that Jesus took my sins onto the Cross
    because I know who I am, and I hope I dont have to depend on my own religiosity.',
    'Bono', 'A truly down-to-earth viewpoint from a really big name', 'first heard it early in my college years', 2),
    ('Quotation', 'Never attribute to malice that which is adequately explained by stupidity.', 'Hanlons Razor', 
    'A good quote Sang gave me when I was telling him about some of my frustrations',
    'I believe Sang told me in 2017 during my Korea trip', 2),
    ('Quotation', 'Our greatest growth usually comes in times of despair.',
    'Trent Dilfer',
    'During a dark dark time when I was attending Boston College.',
    'I believe winter 2004 is when I first read it.', 2),
    ('Quotation',
    'Joel, Im not a concept. Too many guys think Im a concept or I complete them or Im going to make them
    alive, but Im just a fucked up girl who is looking for my own peace of mind. Dont assign me yours.',
    'Girl from Eternal Sunshine of the Spotless Mind',
    'One of the quotes Christine used to like a really long time ago in Boston',
    'Think I read it around 2005 or 2006ish', 2),
    ('Quotation', 
    'A hero can be anyone. Even a man doing something as simple and reassuring as putting a coat around
    a young boys shoulders to let him know that the world hadnt ended.',
    'Bruce Wayne',
    'Good dramatic-ending-like quote from The Dark Knight Rises.',
    'Not sure when that movie came out... a few years ago probably', 2),
    ('Song Lyric', 'See the stone set in your eyes, see the thorn twist in your side. I wait for you.',
    'U2', 'Beautiful poetic lyrics from Bono, among many others, that reverberated within me from early
    highschool until late college.', 'I think Joshua Tree was in the early 1990s', 2),
    ('Song Lyric', 'A thousand times Ive failed, your mercy remains. Should I stumble again, Im caught in
    your grace.', 'Hillsong United', 'Intro to "From The Inside Out" written by Joel Houston that I will never
    forget for the rest of my life.', '"United We Stand" was from the early 2000s, I believe.', 2),
    ('Song Lyric', 'I am the mess you chose, the closet you cannot close...',
    'Staind', 'Favorite lyrics from my longtime favorite song during my early college days, "Everything Changes"',
    'Not sure', 2);

insert into freewrite
    (title, entry_type, list, mood, entry_block, tags, users_id)
VALUES
    ('Do dishes', 'Notes', 'Things To Do', '', 'been sitting in the sink for a couple days now', 'Tiffany', 2),
    ('house: "pdkingdom19"', 'Notes', 'WiFi Passwords', '', 'none', 'none', 2),
    ('Divine Cafe: "GreatCoffee"', 'Notes', 'WiFi Passwords', '', 'password changes frequently', 'none', 2),
    ('Buy orange juice', 'Notes', 'Things To Do', '', 'running low', 'Tiffany', 2),
    ('Finish styling edits and debugging for Portfoilio ASAP', 'Notes', 'Coding', '', 'there are a multiple errors and styling issues that need work', 'none', 2),
    ('Present for Eunice birthday', 'Notes', 'Things To Do', '', 'Mid November birthday, be prepared', 'Eunice', 2),
    ('Prestons apartment: gongnong0423', 'Notes', 'WiFi Passwords', '', 'they just moved, so it could have changed', 'Preston, Yun, Tiffany', 2),
    ('Buy orange juice', 'Notes', 'Things To Do', '', 'running low', 'Tiffany', 2),
    ('Pendergrass flea market', 'Notes', 'Upcoming trips', '', 'near Gainesville area, plan to go soon', 'Tiffany', 2),
    ('Give old iPad back to Dad', 'Notes', 'Important', '', 'give iPad from basement to Dad before he returns to Maryland', 'Dad', 2),
    ('Find good Angular Udemy', 'Notes', 'Coding', '', 'angular seems like the next best framework to learn', 'none', 2),
    ('Test', 'Journal', '', 'Hungry', 'Need to work on this more', 'none', 2);