const db = require("./firebaseInit")();
const invoiceRef = db.collection("facturen");

const getLastAddedRecord = function() {
  return new Promise(function(resolve, reject) {
    invoiceRef
      .orderBy("created_at", "desc")
      .limit(1)
      .get()
      .then(function(prevSnapshot) {
        prevSnapshot.docs.map(doc => {
          const data = doc.data();
          resolve(data);
        });
      });
  });
};

const addInvoice = function(title) {
  return new Promise(function(resolve, reject) {
    invoiceRef
      .add({
        title,
        created_at: Date.now()
      })
      .then(data => {
        console.log("The data is: ", data);
        resolve(true);
      })
      .catch(error => {
        console.log("error");
        resolve(false);
      });
  });
};

module.exports = {
  getLastAddedRecord,
  addInvoice
};
