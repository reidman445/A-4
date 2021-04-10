
const tf = require('@tensorflow/tfjs');
    require('@tensorflow/tfjs-node');

    const iris = require('../../iris.json');
    const irisTesting = require('../../iris-testing.json');

const { request } = require('../../server');
    var lossValue;

exports.trainAndPredict = function (req, res) {
    console.log(irisTesting)
    console.log("+++++++++++++++++++++++RESPONSE: " )

    const trainingData = tf.tensor2d(iris.map(item => [

        item.sepal_length = 32,
        item.sepal_width = 34,
        item.petal_length = 23,
        item.petal_width = 23,

    ]))
  
    const outputData = tf.tensor2d(iris.map(item => [

        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0

    ]))

    const testingData = tf.tensor2d(irisTesting.map(item => [
        item.sepal_length = 213,
        item.sepal_width = 234,
        item.petal_length = 23,
        item.petal_width = 23,
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
        units: 3, 
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
                callbacks: { 
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
        results.array().then(array => {

            console.log(array[0][0])

            var resultForData1 = array[0];
            var resultForData2 = array[1];
            var resultForData3 = array[2];
            var dataToSent = {row1: resultForData1,row2: resultForData2, row3: resultForData3}

            console.log(resultForData1)
            res.status(200).send(dataToSent);
        })

    }
    run()
};

