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

module.exports = {
  getLastAddedRecord
};
