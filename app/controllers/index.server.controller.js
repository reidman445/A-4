//

//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4

//

const tf = require('@tensorflow/tfjs');

    require('@tensorflow/tfjs-node');

    const iris = require('../../iris.json');

    const irisTesting = require('../../iris-testing.json');

    var lossValue;

exports.trainAndPredict = function (req, res) {

    console.log(irisTesting)

    const trainingData = tf.tensor2d(iris.map(item => [

        item.sepal_length, item.sepal_width, item.petal_length,

        item.petal_width

    ]))

    const outputData = tf.tensor2d(iris.map(item => [

        item.species === "setosa" ? 1 : 0,

        item.species === "virginica" ? 1 : 0,

        item.species === "versicolor" ? 1 : 0

    ]))

    const testingData = tf.tensor2d(irisTesting.map(item => [

        item.sepal_length, item.sepal_width,

        item.petal_length, item.petal_width,

    ]))

    const model = tf.sequential()

    model.add(tf.layers.dense({

        inputShape: [4], 

        activation: "sigmoid",

        units: 5, 

    }))

    model.add(tf.layers.dense({

        inputShape: [5], 

        activation: "sigmoid",

        units: 3, //dimension of final output (setosa, virginica, versicolor)

    }))

    model.add(tf.layers.dense({

        activation: "sigmoid",

        units: 3, 

    }))

    model.compile({

        loss: "meanSquaredError",

        optimizer: tf.train.adam(.06),

    })

    console.log(model.summary())

    async function run() {

        const startTime = Date.now()

        await model.fit(trainingData, outputData,         

            {

                epochs: 100,

                callbacks: { //list of callbacks to be called during training

                    onEpochEnd: async (epoch, log) => {

                        lossValue = log.loss;

                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);

                        elapsedTime = Date.now() - startTime;

                        console.log('elapsed time: ' + elapsedTime)

                    }

                }

            }

            

        )

            

        const results = model.predict(testingData);

        //console.log('prediction results: ', results.dataSync())

        //results.print()

        

        // get the values from the tf.Tensor

        //var tensorData = results.dataSync();

        results.array().then(array => {

            console.log(array[0][0])

            var resultForData1 = array[0];

            var resultForData2 = array[1];

            var resultForData3 = array[2];

            var dataToSent = {row1: resultForData1,row2: resultForData2, row3: resultForData3}

            console.log(resultForData1)

            res.status(200).send(dataToSent);

            //

            /*

            res.render('results',

                {

                    elapsedTime: elapsedTime / 1000,

                    lossValue: lossValue,

                    resultForData1: resultForData1[0],

                    resultForData2: resultForData2,

                    resultForData3: resultForData3

                }

            )

            */                    

            //

        })

        //


    } //end of run function

    run()


};

