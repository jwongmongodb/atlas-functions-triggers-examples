exports = async function(changeEvent){
  console.log(JSON.stringify(changeEvent));
  
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "sample_supplies";
  var collName = "sales";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  const deleteFilter = { "_id": changeEvent._id._data };
  try {
    deleteResult = await collection.deleteOne(deleteFilter);
    return deleteResult["deletedCount"];
  } catch(err) {
    console.log("Failed to delete item: ", err.message);
    return { error: err.message };
  }
};

// In the Testing Console tab, paste the code below and click Run:
/*
exports({
  _id: {_data: '62548f79e7f11292792497cc' },
  operationType: 'insert',
  clusterTime: {
    "$timestamp": {
      t: 1649712420,
      i:6
    }
  },
  ns: {
    db: 'engineering',
    coll: 'users'
  },
  documentKey: {
    storeLocation: 'East Appleton',
    _id: "62548f79e7f11292792497cc"
  },
  fullDocument: {
    _id: "599af247bb69cd89961c986d",
    storeLocation: 'East Appleton',
    couponUsed: false
  }
})
*/