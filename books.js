/*
   Copyright 2016, Google, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var url = require('url');

module.exports = function(config) {

  require('dotenv').load();

  // Load the Cloudant library.
  var Cloudant = require('@cloudant/cloudant');
  var cloudant = Cloudant("https://456b32df-2d1b-4284-adb9-c87e5fb0d04b-bluemix:40cb512f46a98cd3f51492e5d3de89fba72c1968d9eee9142d3b30f91814ce94@456b32df-2d1b-4284-adb9-c87e5fb0d04b-bluemix.cloudantnosqldb.appdomain.cloud");

  var db = cloudant.db.use('library')

    db.list({include_docs:true}, function (err, data) {
      console.log(err, data.rows);
    });

  const AWS = require('ibm-cos-sdk');

  var config = {
      ibmAuthEndpoint: 'https://iam.ng.bluemix.net/oidc/token',
      endpoint: 'https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints',
      apiKeyId: 'YHvxP3pmwwzmbNmTlUc34mJvKsnURD1xfIYgQ6eUb0er',
      serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/b282a4a54c7de42a2314b0699a84ee7c:ad64bc04-4c68-46c5-99e9-210047861ef7::',
  };

  var cos = new AWS.S3(config);
    
  // // Change bucket property to your Space name
  // const upload = multer({
  //   storage: multerS3({
  //     s3: s3,
  //     bucket: 'library-restricted-section',
  //     acl: 'public-read',
  //     key: function (request, file, cb) {
  //       console.log(file);
  //       cb(null, file.originalname);
  //     }
  //   })
  // }).array('upload', 1);

  // ---------------------------------------------------------------

  function getAllBooks(callback) {
    db.list({include_docs:true}, function (err, data) {
      console.log(err, data.rows);

      callback(err, data.rows);
    });
  }

  function getUserBooks(userId, callback) {
    callback(new Error('books.getUserBooks [Not Yet Implemented]'));
  }

  function addBook(title, author, coverImageData, userId, callback) {

    var key_name = "book" + Math.floor((Math.random() * 100) + 1);;    
    var entity = {
        _id: key_name,                                                                               
        title: title,                                                                
        author: author                                                                            
    };

    // datastore.save(entity, callback);  
    db.insert(entity, callback);
  }

  function deleteBook(bookId, callback) {
    // var key = datastore.key(['Book', parseInt(bookId, 10)]);

    db.get(bookId).then((body) => {
      console.log(body);

      db.destroy(body._id, body._rev).then((body) => {
        console.log(body);
      });
    });
  }

  return {
    getAllBooks: getAllBooks,
    getUserBooks: getUserBooks,
    addBook: addBook,
    deleteBook: deleteBook
  };
};
