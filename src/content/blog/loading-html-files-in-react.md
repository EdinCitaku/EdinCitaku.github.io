---
title: Loading html files in React
pubDate: 2020-04-09
description: A simple solution for a problem I encountered while writing a privacy policy page
tags: ['react', 'nodejs']
---
Recently I solved an issue in the webapp I am writing for the [Zukunftschreiben](https://zukunftschreiben.org/) team.
Since it was a fairly easy fix and I didn't immediately find a solution on google, I wanted to write down what I came up with.
The problem was that the webapp needed a page that explained its privacy policy. This policy was a huge html file and I did not want hard code its content as a react component.
# The Solution
The solution was quite simple, as it turns out there is a package named [html-react-parser](https://www.npmjs.com/package/html-react-parser) that can parse html as a string.  
But first I needed to get the html file as a string from my component. The backend of the webapp was written in nodejs with express, so I decided to provide an API that returns the string as a file.

Here we load our file and create the function that returns the html file as a string
###### privacyPolicy.controller.js
```
const fs = require('fs');
var text = fs.readFileSync("./resources/privacy-policy.html",'utf8');

exports.getPrivacyPolicy = function (req,res) {
    res.json(text)
}
```
  
   
   
Here we provide the API that returns the file as a string
###### privacyPolicy.route.js
```
module.exports = privacyPolicyRoute;

function privacyPolicyRoute(){
    var privacyPolicyController = require('../controllers/privacyPolicy.controller');

    var router = require('express').Router();
    router.get("/privacy-policy", privacyPolicyController.getPrivacyPolicy)
    return router
}
```
Now its time to consume this API and display our privacy policy in our frontend.

###### PrivacyPolicy.js
```
class PrivacyPolicy extends Component {
    constructor(props){
        super(props)
        this.state = {data: '' }
    }

    componentDidMount() {
        fetch('${BACKEND_IP}:${BACKEND_PORT}/api/privacy-policy')
            .then((response) => response.json())
            .then((data) => {
                        this.setState({
                            data: data
                        })
            })
    }
    render() {
        return  parse(this.state.data);
    }
}
```
And thats it! We were able to display a really long static html without having to hardcode it as a component! :)
I will provide a github repo soon where u can try it out yourself!