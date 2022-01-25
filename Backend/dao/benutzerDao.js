const helper = require('../helper.js');
const md5 = require('md5');
const BenutzerrolleDao = require('./benutzerrolleDao.js');
const PersonDao = require('./personDao.js');

class BenutzerDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Benutzer WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result = helper.objectKeysToLower(result);

        return result;
    }

    loadAll() {
        const benutzerrolleDao = new BenutzerrolleDao(this._conn);
        var roles = benutzerrolleDao.loadAll();
        const personDao = new PersonDao(this._conn);
        var persons = personDao.loadAll();

        var sql = 'SELECT * FROM Benutzer';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        result = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < result.length; i++) {

            for (var element of roles) {
                if (element.id == result[i].benutzerrolleid) {
                    result[i].benutzerrolle = element;
                    break;
                }
            }
            delete result[i].benutzerrolleid;

            if (helper.isNull(result[i].personid)) {
                result[i].person = null;
            } else {
                for (var element of persons) {
                    if (element.id == result[i].personid) {
                        result[i].person = element;
                        break;
                    }
                }
            }
            delete result[i].personid;
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(ID) AS cnt FROM Benutzer WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    isunique(email) {
        var sql = 'SELECT COUNT(ID) AS cnt FROM Benutzer WHERE Email=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(email);
        
        if (result.cnt == 0) 
            return true;

        return false;
    }

    hasaccess(email, passwort) {

        var sql = 'SELECT ID FROM Benutzer WHERE Email=? AND Passwort=?';
        var statement = this._conn.prepare(sql);
        var params = [email, md5(passwort)];
        var result = statement.get(params);

        if (helper.isUndefined(result)) 
            throw new Error('User has no access');
     
        return this.loadById(result.ID);
    }

    create(benutzername = '', passwort = '', vorname='', nachname='', strasse='', hausnummer='', plz='', ort='', email='', wallet='0') {
        var sql = 'INSERT INTO Benutzer (Benutzername,Passwort,Vorname,Nachname,Strasse,Hausnummer,Plz,Ort,Email,Wallet) VALUES (?,?,?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [benutzername, md5(passwort), vorname,nachname,strasse,hausnummer,plz,ort, email, wallet];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

    }


    update(id='', vorname = '', nachname = '', benutzername = '', email = '', strasse = '', hausnummer = '', plz = '', ort = '', passwort = '', wallet = '') {

        
        var sql = 'UPDATE Benutzer SET Vorname=?, Nachname=?, Benutzername=?, Email=?, Strasse=?, Hausnummer=?, Plz=?, Ort=?, Passwort=?, Wallet=? WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var params = [vorname, nachname, benutzername, email, strasse, hausnummer, plz, ort, md5(passwort),  wallet, id];

        var result = statement.run(params);

        var updatedObj = this.loadById(id);
        return updatedObj;
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Benutzer WHERE ID=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        helper.log('BenutzerDao [_conn=' + this._conn + ']');
    }
}

module.exports = BenutzerDao;