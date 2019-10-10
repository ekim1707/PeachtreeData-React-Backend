const db = require('../db');
const bcrypt = require('bcrypt');

async function getAll() {

    const allData = await db.one(`
        select * from users
    `);

    return allData
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

async function updateNewsfeed({ post, where, whom, when, user_id }) {
    try {

        const query = await db.one(`

            insert into newsfeed
                (post, where_at, with_whom, timestamp_option, users_id)
            values ($1, $2, $3, $4, $5)

            returning id, post, where_at, with_whom, timestamp_option, users_id
        `, [post, where, whom, when, user_id]);

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

async function updateQuotebook({ type, quote, origin, significance, when_said, user_id }) {
    try {

        const query = await db.one(`

            insert into quotebook
                (quote_type, quote, origin, significance, when_said, users_id)
            values ($1, $2, $3, $4, $5, $6)

            returning id, quote_type, quote, origin, significance, when_said, users_id
        `, [type, quote, origin, significance, when_said, user_id]);

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

module.exports = {

    getAll,
    getUser,
    getData,
    checkUser,
    checkQuery,
    updateToken,
    updateNewsfeed,
    removePost,
    updateQuotebook,
    removeQuote

}