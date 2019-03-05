# JS Test

## Preparation

1. Run `npm install` in the root folder of the test

## The test

We provide a set of shapes (located in `src/__tests__/shapes.json`) and we want you to write a mechanism that makes it possible to apply a set of filters and transformations (listed in `src/__tests__/operations.json`) and then return the shapes after those operations (that should match `src/__tests__/output.json`).

The fully finished task consists of the following items:

1. Code cleaned up and sent as zip file (please do not include `node_modules`)
2. File `src/index.js` should expose an API for interacting with the solution
3. The Exposed API should have at least one function/method that allows to run the solution - that function should accept 2 arrays as input (1 array for the shapes and 1 array for the filters and transforms) and a return array with the output (transformed and filtered shapes). 
   It's up to you how you organize the code - you can use class, static class, function, module (set of functions) or anything you like.
4. There must be at least one test placed in `src/__tests__/index.test.js` that tests the implementation. Tests don't have to cover all the possible cases - it's up to you to decide what should be tested and how much time should be spent on that.
5. We should be able to unzip your package, then run `npm install` and `npm run test` and that should run the tests correctly

## What we'll check:

1. Does the test work? (running `npm run test` passes the tests)
2. Quality of the code:
   - is the code clean?
   - how well is it structured?
   - is the code commented where it is required (no need to add comments to each and every function)?
3. Architecture
   - is it easy to find out how the solution is organized?
   - is it possible, to e.g. add a new filter or transformation, if so, then how easily?

## Provided data

Current sample data contains the following types of shapes:

#### Rectangle

```
{
  "type": "rectangle",
  "width": 10, // width of the rectangle
  "height" 10, // height of the rectangle
  "x": 30, // x-coordinate of rectangle's center
  "y": 30 // y-coordinate of rectangle's center
}
```

#### Square

```
{
  "type": "square",
  "width": 10, // width of the square
  "x": 10, // x-coordinate of square's center
  "y": 10 // y-coordinate of the square's center
}
```

#### Circle

```
{
  "type": "circle",
  "radius": 10, // radius of the circle
  "x": 50, // x-coordinate of the circle's center
  "y": 50 // y-coordinate of the circle's center
}
```

### Filters and transforms that should be handled

#### Filter types

1. `area` - area of the shape, sample input:

```
{
  "filter": "area",
  "operator": "lt",
  "value": 5
}
```

2. `circumference` - circumference of the shape, sample input:

```
{
  "filter": "circumference",
  "operator": "lt",
  "value": 20
}
```

#### Filters operators

1. If `operator` of the filter is `lt` (less than), then it should allow only items which value is less than the passed `value`

For example, if the filter config is the following:

```
{
  "filter": "area",
  "operator": "lt",
  "value": 10
}
```

then filter should allow only shapes with area less than 10 (so remove all the shapes with area equal to or greater than 10)

2. If `operator` is `gt` then it should work in the opposite way - allow only shapes with e.g. area greater than 10.

3. If `operator` is `in` then it should allow only for shapes that e.g. area is in range given range:

```
{
  "filter": "area",
  "operator": "in",
  "value": [10, 20] // greater than 10 and less than 20
}
```

4. If the operator is different than those 3 then filter should return all the items (skip filtering).

> NOTE: All the operators should use strict comparison (`<`, `>`, not `>=`, `<=`)

#### Transforms

> NOTE: please use `Math.round()` on all the values computed during transformations (i.e. when computing new width during scaling: `width = Math.round(shape.width * transform.factor)`).

1. `scale` - scales the shape by the passed `factor`, sample input:

```
{
  "transform": "scale",
  "factor": 2
}
```

To make things easy, `scale` transform scales only edges and radius

2. `move` - moves the shape by passed coordinate, sample input:

```
{
  "transform": "move",
  "x": 10,
  "y": -5
}
```
