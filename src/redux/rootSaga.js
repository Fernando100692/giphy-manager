// Dependencies
import { spawn } from 'redux-saga/effects'

// Sagas
import todoSaga from './sagas/todo-saga'

export default function* rootSaga() {
	yield spawn(todoSaga)
}