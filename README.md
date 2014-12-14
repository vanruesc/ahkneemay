# ahkneemay [![Build Status](https://travis-ci.org/raoul-van-rueschen-14-fhb/ahkneemay.svg)](http://travis-ci.org/raoul-van-rueschen-14-fhb/ahkneemay)

A web server that keeps track of your watched animes by storing information in the cloud. This project relies on the Amazon Web Services EC2, DynamoDB and S3-Buckets.

## Running the Server

Install [Node](http://nodejs.org/) first! Download this project, open the terminal or command line and navigate to the project's root directory. Then fetch dependencies with:

```javascript
npm install
```

Since this application relies on AWS, you'll have to provide your credentials in _aws.json_. There's an example in the _config_ folder. You may then start the server with:

```javascript
node index.js PORT ENVIRONMENT
```

The server will listen on the specified port (default is 80!). Setting the environment to "production" lets the server optimize some things and generate log files. In case you wish to run this project behind a proxy, you'll have to [configure Node manually](http://jjasonclark.com/how-to-setup-node-behind-web-proxy).

## Documentation
_(Coming soon)_

## Contributing
Maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Raoul van Rüschen  
Licensed under the Zlib license.
