'use strict';

var expect = require('chai').expect;
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe('Treemap', function() {
  it('renders treemap', function() {
    var Treemap = require('../src/treemap').Treemap;
    var generate = require('./utils/datagen').generateArrayOfNameObjects;
    var points = 5;

    // Render a treemap using array data
    var data = generate(points);
    var width = 500, height = 250;

    var treemap = TestUtils.renderIntoDocument(
      <Treemap data={data} width={width} height={height} /> 
    );

    var treemapGroup = TestUtils.findRenderedDOMComponentWithClass(treemap, 'rd3-treemap');
    expect(treemapGroup).to.exist;
    expect(treemapGroup.tagName).to.equal('g');
    
    // Verify that it has the same number of nodes as the array's length
    var cells = TestUtils.scryRenderedDOMComponentsWithClass(treemap, 'rd3-treemap-cell');
    // Magic number '1' is the parent node
    expect(cells.length).to.equal(data.length + 1);

    // Note that the first node generated will always be the parent node 
    expect(Number(ReactDOM.findDOMNode(cells[0]).getAttribute('width'))).to.equal(width);


    var labels = TestUtils.scryRenderedDOMComponentsWithClass(
      treemap, 'rd3-treemap-cell-text');

    expect(ReactDOM.findDOMNode(labels[0]).textContent).to.be.empty;
    expect(labels.length).to.equal(data.length + 1);

  });
});
