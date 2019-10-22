const db = require('../db');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

async function getForumData() {
    try {
        const allData = await db.any(`
            select * from forum
        `)
    
        return allData;
    } catch (error) {
        return {
            msg: 'forum db had an error'
        }
    }
}

async function updateForumData({ postb64, tagb64, dateb64, timeb64 }) {
    try {
        console.log(base64.decode(dateb64));

        const query = await db.one(`

            insert into forum
                (post, tag, date_posted, time_posted) 
            values ($1, $2, $3, $4)

            returning id, post, tag, date_posted, time_posted
        `, [base64.decode(postb64), base64.decode(tagb64), base64.decode(dateb64), base64.decode(timeb64)]);

        const returnData = await db.any(`
            select * from forum
        `);

        return returnData;

    } catch (error) {
        return {
            msg: 'some forum error occured!'
        }
    }
}

async function getUser(email) {
    try {

        const data = await db.one(`
            select * from users where email=$1
        `, [email]);

        return data;

    } catch (error) {
        return {
            msg: 'error'
        }
    }
}

async function getData(id, type) {
    try {

        const data = await db.any(`
            select * from ${type} where users_id=$1
        `, [id]);

        return data;

    } catch (error) {
        return {
            msg: 'error'
        }
    }
}

async function checkUser({ first_name, last_name, email, password }) {
    try {

        const checkUser = await db.any(`
    
            select * from users where email=$1
    
        `, [email]);

        if(checkUser.length > 0) {
            return {
                msg: "error"
            }
        } else {
            return createUser({ first_name, last_name, email, password });
        }

    } catch (error) {
// Will almost certainly not ever happen
        return {
            msg: "error"
        }

    }
}

async function createUser({ first_name, last_name, email, password }) {
    try {

        const hash = bcrypt.hashSync(password, 10);
        console.log(hash);

        const newUser = await db.one(`
            insert into users
                (first_name, last_name, email, password)
            values ($1, $2, $3, $4)

            returning id, email

        `, [first_name, last_name, email, hash]);

        return newUser;

    } catch (error) {
// Will almost certainly not ever happen
        return {
            msg: "different error"
        }

    }
}

async function checkQuery({ email, password }) {
    try{

        const query = await db.one(`

            SELECT * FROM users WHERE email=$1

       `, [email]);

        const correctPass = bcrypt.compareSync(password, query.password);

        if (correctPass) {
            return {
                id: query.id,
                email: email
            };
        } else {
            return {
                msg: 'Sorry this user doesnt exist or the password was incorrect'
            };
        }

    } catch (error) {

        return {
            msg: 'Error'
        }

    }
}

async function updateToken(token, email) {
    try {

        const query = await db.one(`
        
            update users set token=$1 where email=$2

        `, [token, email])

        return query;

    } catch (error) {
        return {
            msg: 'some error!'
        }
    }
}

async function updateNewsfeed({ postb64, whereb64, whomb64, whenb64, user_id }) {
    try {

        const query = await db.one(`

            insert into newsfeed
                (post, where_at, with_whom, timestamp_option, users_id) 
            values ($1, $2, $3, $4, $5)

            returning id, post, where_at, with_whom, timestamp_option, users_id
        `, [base64.decode(postb64), base64.decode(whereb64), base64.decode(whomb64), base64.decode(whenb64), user_id]);

        const returnData = await db.any(`

            select * from newsfeed where users_id=$1

        `, [user_id]);

        return returnData;

    } catch (error) {
        return {
            msg: 'some error!'
        }
    }
}

async function removePost({ id, user_id }) {
    try {

        const query = await db.none(`

            delete from newsfeed where id=$1

        `, [id]);

        const returnData = await db.any(`

            select * from newsfeed where users_id=$1
        
        `, [user_id]);

        return returnData;

    } catch (error) {
        console.log(error);
        return {
            msg: 'some error!'
        }
    }
}

async function getAllUsers() {
    try {
        const allUsers = await db.any(`
            select * from connections
        `);

        return allUsers;
    } catch (error) {
        return {
            msg: 'User list failed!'
        }
    }
}

async function toggleFavorite({ id, favorite, user_id }) {
    try {
        const query = await db.none(`

            update connections 
                set favorite=$1
            where id=$2

        `, [favorite, id]);

        const returnData = await db.any(`

            select * from connections where users_id=$1

        `, [user_id]);

        returnData;

        return returnData;

    } catch (error) {
        return {
            msg: 'error adding favorite!'
        }
    }
}

async function updateQuotebook({ type, quoteb64, originb64, significanceb64, when_saidb64, user_id }) {
    try {

        const query = await db.one(`

            insert into quotebook
                (quote_type, quote, origin, significance, when_said, users_id)
            values ($1, $2, $3, $4, $5, $6)

            returning id, quote_type, quote, origin, significance, when_said, users_id
        `, [type, base64.decode(quoteb64), base64.decode(originb64), base64.decode(significanceb64), base64.decode(when_saidb64), user_id]);

        const returnData = await db.any(`

            select * from quotebook where users_id=$1

        `, [user_id]);

        return returnData;

    } catch (error) {
        return {
            msg: 'some error!'
        }
    }
}

async function removeQuote({ id, user_id }) {
    try {

        const query = await db.none(`

            delete from quotebook where id=$1

        `, [id]);

        const returnData = await db.any(`

            select * from quotebook where users_id=$1
        
        `, [user_id]);

        return returnData;

    } catch (error) {
        console.log(error);
        return {
            msg: 'some error!'
        }
    }
}

async function updateFreeWrite({ titleb64, type, listb64, moodb64, entryb64, tagsb64, user_id }) {
    try {

        const query = await db.one(`

            insert into freewrite
                (title, entry_type, list, mood, entry_block, tags, users_id)
            values ($1, $2, $3, $4, $5, $6, $7)

            returning id, title, entry_type, list, mood, entry_block, tags, users_id
        `, [base64.decode(titleb64), type, base64.decode(listb64), base64.decode(moodb64), base64.decode(entryb64), base64.decode(tagsb64), user_id]);

        const returnData = await db.any(`

            select * from freewrite where users_id=$1

        `, [user_id]);

        return returnData;

    } catch (error) {
        return {
            msg: 'some error!'
        }
    }
}

async function removeFreeWrite({ id, user_id }) {
    try {

        const query = await db.none(`

            delete from freewrite where id=$1

        `, [id]);

        const returnData = await db.any(`

            select * from freewrite where users_id=$1
        
        `, [user_id]);

        return returnData;

    } catch (error) {
        console.log(error);
        return {
            msg: 'some error!'
        }
    }
}

async function removeSticky({ listb64, user_id }) {
    try {

        const query = await db.none(`

            delete from freewrite where list=$1 and users_id=$2

        `, [base64.decode(listb64), user_id]);

        const returnData = await db.any(`

            select * from freewrite where users_id=$1
        
        `, [user_id]);

        return returnData;

    } catch (error) {
        console.log(error);
        return {
            msg: 'some error!'
        }
    }
}

module.exports = {

    getForumData,
    updateForumData,
    getUser,
    getData,
    checkUser,
    checkQuery,
    updateToken,
    updateNewsfeed,
    removePost,
    getAllUsers,
    toggleFavorite,
    updateQuotebook,
    removeQuote,
    updateFreeWrite,
    removeFreeWrite,
    removeSticky

}