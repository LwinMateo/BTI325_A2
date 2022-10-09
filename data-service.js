const fs = require('fs');
const { resolve } = require('path');

var employees = new Array();
var departments = new Array();

//exports = module.exports = {};

module.exports.initialize=function(){
    
    return new Promise(function(resolve, reject){
        fs.readFile('./data/employees.json',(err,data)=>{
            if(err) 
                reject("Failure to read file employees.json!");
            employees = JSON.parse(data);
            resolve();
        })
    
        fs.readFile('./data/departments.json',(err,data)=>{
            if(err) 
                reject("Failure to read file departments.json!");
            departments = JSON.parse(data);
            resolve();
        })
    });
};

module.exports.getAllEmployees=function(){

    return new Promise((resolve, reject) => {
        if(employees.length == 0)
            reject("No list of data to be read on Employee");

        resolve(employees);
    });
};


module.exports.getManagers=function(){
    return new Promise((resolve, reject) => {
        var managers = [];
        for (var i = 0; i < employees.length; i++){
            if(employees[i].isManager == true){
                managers.push(employees[i]);
            }
        }

        if(managers.length == 0){
            reject('No Managers To be found on Employees');
        }
        resolve(employees)
    });
    
};

module.exports.getDepartments=function(){
    return new Promise((resolve, reject) => {
        if(departments.length == 0)
            reject("No list of data to be read");
        resolve(departments);
    });
};



