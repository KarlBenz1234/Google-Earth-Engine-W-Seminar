var x_min = 0;						//export Area x coordinate minimum
var x_max = 60;						//export Area x coordinate maximum
var y_min = 30;						//export Area y coordinate minimum
var y_max = 70;						//export Area x coordinate maximum

var x = 20;							//viewport Area middle x coordinate
var y = 50;							//viewport Area middle y coordinate
var z = 5;							//viewport Area zoom level

var dateBegin = '2000-01-01';		//first date of image range
var dateEnd = '2000-12-01';			//last date of image range


var dataset = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filter(
  ee.Filter.date(dateBegin, dateEnd)).median();
var nir = dataset.select('SR_B4');
var red = dataset.select('SR_B3');
var ndvi = nir.subtract(red).divide(nir.add(red));


Map.setCenter(x,y,z);

Map.addLayer(ndvi);

var geometry = ee.Geometry.Rectangle([x_min, y_min, x_max, y_max]);
Export.image.toDrive({image: ndvi, description: 'imageToDriveExample_transform', scale: 10, region: geometry});
