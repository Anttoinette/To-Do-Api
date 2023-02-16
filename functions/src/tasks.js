import { getFirestoreInstance } from "./utils.js";
import { FieldValue } from "firebase-admin/firestore"; //to get the time

export async function getAllTasks(req, res) {
    const db = await getFirestoreInstance();
    console.log("Got connected")

     db.collection('tasks').orderBy('createdAt', 'desc').get()
    .then(collection => {
        const tasks = collection.docs.map(doc => ({taskId: doc.id, ...doc.data()}));
        res.send(tasks);
    })
    .catch(err => res.status(500).json({error: err.message }));
}

export async function addTask(req, res) {
    const { task } = req.body;
    const newTask = { task, createdAt: FieldValue.serverTimestamp()} //adds time
    const db = await getFirestoreInstance();
    db.collection('tasks').add(newTask)
    // if this is succesful  it will call all tassk.
    .then( () => getAllTasks(req, res))
    .catch(err => res.status(500).send({ error: err.message }));
}

export async function updateTask(req, res) {
    const { task } = req.body;
    const { taskId } = req.params;
    const db = await getFirestoreInstance ();
    db.collection('tasks').doc(taskId).update({ done })
    .then (() => getAllTasks(req, res))
    .catch(err => res.status(500).send({ error: err.message }));


}

export async function deleteTask(req, res) {
    const { taskId } = req.params;
       const db = await getFirestoreInstance();
   
    db.collection('tasks')
    .doc(taskId)
    .delete({ task })
    .then( () => getAllTasks(req, res))
    .catch(err => res.status(500).send({ error: err.message}))
}