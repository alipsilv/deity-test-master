//Object to store operators
//To define a new operator add a new item followed by a function below

var operators = {
    "lt":(x,y) => {
        return x < y;
    },
    "gt":(x,y) => {
        return x > y;
    },
    "in":(x,y) => {
        return x > y[0] && x < y[1];
    }
};

//Transformation functions
/*
To define a new feature:
  var newTransformation = (shapes, operation) => {}
*/

//I scale a shape depending on the type of shape
var scale = (shapes, operation) => {
    if (shapes.length>0){
      shapes.forEach((shape) => {
        if (shape.type === 'circle'){
          shape.radius = Math.round(shape.radius * operation.factor);
        }else if (shape.type === 'rectangle') {
          shape.width = Math.round(shape.width * operation.factor);
          shape.height = Math.round(shape.height * operation.factor);
        }else if (shape.type === 'square') {
          shape.width = Math.round(shape.width * operation.factor);
        }
      });
    }
    return shapes;
}

//I move a shape setting the axes x and Y
var move = (shapes, operation) => {
    shapes.forEach((shape) => {
      shape.x += operation.x;
      shape.y += operation.y;
    });
    return shapes;
}

//Filters functions
/*
To define a new filter:
  var newFilter = (shapes, operation) => {}
*/

//I filter a shape by area
var filter_area = (shapes, operation) =>  {
    if (operators.hasOwnProperty(operation.operator)){
      return shapes.filter((shape)=>{
          var area = 0;
          if (shape.type === 'circle'){
              area = (Math.pow(shape.radius,2) * Math.PI);
          }else if (shape.type === 'square') {
              area = (Math.pow(shape.width,2));
          }else if (shape.type === 'rectangle') {
              area = (shape.width * shape.height);
          }
          return operators[operation.operator](Math.round(area), operation.value);
      });
    } else {return shapes}
}

//I filter a shape by filter_circumference
var filter_circumference = (shapes, operation) =>  {
    if (operators.hasOwnProperty(operation.operator)){
      return shapes.filter((shape)=>{
          var circumference = 0;
          if (shape.type === 'circle'){
              circumference =  ((shape.radius * 2) * Math.PI);
          }else if (shape.type === 'square') {
              circumference =  (shape.width * 4 );
          }else if (shape.type === 'rectangle') {
              circumference =  ((shape.width * 2) + (shape.height * 2));
          }
          return operators[operation.operator](Math.round(circumference), operation.value);
      });
    } else {return shapes}
}

//I apply the correct filter
var filters = (shapes, operation) => {
    var output = [];
    switch(operation.filter) {
      case 'area':
        output = filter_area(shapes, operation);
        break;
      case 'circumference':
        output = filter_circumference(shapes, operation);
        break;
    }
    return output;
};

//I apply the correct transformation
var transforms = (shapes, operation) => {
    var output = [];
    switch(operation.transform) {
      case 'scale':
        output = scale(shapes, operation);
        break;
      case 'move':
        output = move(shapes, operation);
        break;
    }
    return output;
};

//I apply the correct modification - filter or transformation
var modify = (shapes, operations) => {
    var output = Object.assign([],shapes);
    operations.forEach((operation) => {
      if (operation.hasOwnProperty('transform')){
        output = transforms(output, operation);
      }else if (operation.hasOwnProperty('filter')){
        output = filters(output, operation);
      }

      /*
      //Log each operation and result good to debug!
      console.log(operation);
      console.log(output);
      console.log("");*/
    });
    return output;
}

module.exports = {
    modify,
    operators,
    scale,
    move,
    filter_area,
    filter_circumference,
    filters,
    transforms
};
