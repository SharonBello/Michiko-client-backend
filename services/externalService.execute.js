

function setIsWorkerOn(bool) {
    isWorkerOn = bool;
    // console.log(taskService);
    // runWorker();
}

function execute(task) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNum = Math.random();
            if (randomNum > 0.5) resolve(parseInt(Math.random() * 100))
            // TODO: throw some more random errors like in the image above
            else if (randomNum > 0.4) reject('High Temperature')
            else if (randomNum > 0.3) reject('To much for me ')
            else if (randomNum > 0.2) reject('Shit shit shit')
            else if (randomNum > 0.1) reject('another error')
        }, 5000)
    })
}

async function runWorker() {
    console.log('worker is Running')
    if (!isWorkerOn) return;
    let delay = 5000
    try {
        // const set = await setService.getNextSet()
    if (set) {
    try {
    // await setService.runSet(set)
    } catch (err) {
    console.log(`Failed Set`, err)
    } finally {
    delay = 1
    }
    } else {
    console.log('Snoozing... no sets to perform')
    }
    } catch(err) {
    console.log(`Failed getting next set to execute`, err)
    } finally {
    setTimeout(runWorker, delay)
    }
}

module.exports = {
    execute,
    runWorker,
    setIsWorkerOn
}