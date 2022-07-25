// Dependencies
import { spawn } from 'redux-saga/effects'

// Sagas
import giphySaga from './sagas/giphy-saga'

export default function* rootSaga() {
	yield spawn(giphySaga)
}