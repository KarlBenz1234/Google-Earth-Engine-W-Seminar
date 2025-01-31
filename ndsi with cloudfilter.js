var x_min = 0;						//export Area x coordinate minimum
var x_max = 60;						//export Area x coordinate maximum
var y_min = 30;						//export Area y coordinate minimum
var y_max = 70;						//export Area x coordinate maximum

var x = 20;							//viewport Area middle x coordinate
var y = 50;							//viewport Area middle y coordinate
var z = 5;							//viewport Area zoom level

var dateBegin = '2000-01-01';		//first date of image range
var dateEnd = '2000-12-01';			//last date of image range

var cloudCover = 10;				//in percent of the total image area; 0 for no clouds


var raw = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filter(
  ee.Filter.date(dateBegin, dateEnd));
var dataset = raw.filter(ee.Filter.eq('CLOUD_COVER', cloudCover)).median();
var swir = dataset.select('SR_B5');
var green = dataset.select('SR_B2');
var ndsi = green.subtract(swir).divide(green.add(swir));


Map.setCenter(x,y,z);

Map.addLayer(ndsi);

var geometry = ee.Geometry.Rectangle([x_min, y_min, x_max, y_max]);
Export.image.toDrive({image: ndvi, description: 'imageToDriveExample_transform', scale: 10, region: geometry});
