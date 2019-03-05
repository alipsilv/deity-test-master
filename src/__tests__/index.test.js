const request = require('supertest')
const app = require('../app')
const data = require('../datajson')
const operations = require('../operations')

describe('This is my hello world test', () => {
  test('It Should be a Hello world',() =>{
    const output = 'Hello world'
    expect(output).toBe('Hello world')
  })
});

describe('Test the root path', () => {
    test('It should response the GET method when accessing "/"', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200)
            done();
        });
    });
});

describe('It should test the "/put" method using known shapes, operation and output', () => {
  test('It should response the GET method "/put" with the correct output ', (done) => {
      request(app).get('/put?shapes=[{"id":1,"type":"rectangle","width":20,"height":10,"x":10,"y":10}]&operations=[{"filter":"circumference","operator":"in","value":[39,300]}]').then((response) => {
          expect(response.text).toBe('[{"id":1,"type":"rectangle","width":20,"height":10,"x":10,"y":10}]');
          done();
      });
  });
});

//Test internal filters and transformatiosns
var shapesJson = [{id:1, type:'rectangle', width:20, height:10, x:10, y:10}]
var operationsJson = [{filter:'circumference', operator:'in', value:[39,300]}]
var transf_move = {transform:'move', x:30, y:30}
var filter_area_lt = {filter:'area', operator: 'lt', value: 300}
var filter_area_gt = {filter:'area', operator: 'gt', value: 200}
var filter_area_in = {filter:'area', operator: 'in', value: [200,300]}
var filter_circunference_gt = {filter:'circumference', operator: 'gt',value: 71}
var transf_scale = {transform: 'scale',factor: 1.2}

describe('It should test internal functions', () => {
    test('It should apply a scale ',() =>{
      const output = operations.scale(shapesJson, transf_scale)
      expect(output).toEqual([{id: 1, type: 'rectangle', width: 24,height: 12, x: 10, y: 10}])
    })

    test('It should move a shape ',() =>{
      const output = operations.move(shapesJson,transf_move)
      expect(output).toEqual([{id:1, type:'rectangle', width:24, height:12, x:40, y:40}])
    })

    test('It should apply an area filter "lt" 300',() =>{
      const output = operations.filter_area(shapesJson,filter_area_lt)
      expect(output).toEqual([{id:1, type:'rectangle', width:24, height:12, x:40, y:40}])
    })

    test('It should apply an area filter "gt" 200',() =>{
      const output = operations.filter_area(shapesJson,filter_area_gt)
      expect(output).toEqual([{id:1, type:'rectangle', width:24, height:12, x:40, y:40}])
    })

    test('It should apply an area filter "in" [200,300]',() =>{
      const output = operations.filter_area(shapesJson,filter_area_in)
      expect(output).toEqual([{id:1, type:'rectangle', width:24, height:12, x:40, y:40}])
    })
    test(
      'It should apply an circunference filter "gt"',() =>{
      const output = operations.filter_area(shapesJson,filter_circunference_gt)
      expect(output).toEqual([{id:1, type:'rectangle', width:24, height:12, x:40, y:40}])
    })
});

//Test json database from __tests__
var shapesDB = data.getShapes()
var operationsDB = data.getOperations()
var outputDB = data.getOutput()

describe('It should test the "/put" method using the shapes, operation and output from __test__', () => {
  test('It should response the GET method "/put" with the correct output ', (done) => {
      request(app).get('/put?shapes='+ JSON.stringify(shapesDB) +'&operations='+ JSON.stringify(operationsDB)).then((response) => {
          expect(JSON.parse(response.text)).toEqual(outputDB);
          done();
      });
  });
});
