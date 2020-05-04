import { put, call, select } from 'redux-saga/effects';
import { updateAuth, initAuth } from 'redux/actions/auth';
import { isEmail } from 'utils/validations';
import * as APIs from 'services/api';
import { initApp, setLoading, updateApp } from 'redux/actions/app';

export function* login(action) {
  const {
    payload: { email, password },
  } = action;
  if (email === '' || password === '') {
    return yield put(
      updateAuth({
        errorMessage: 'Please input email and password',
      })
    );
  }
  if (!isEmail(email)) {
    return yield put(
      updateAuth({
        errorMessage: 'Please input a valid email',
      })
    );
  }
  yield put(
    updateAuth({
      errorMessage: '',
    })
  );
  try {
    yield put(setLoading(true));
    const res = yield call(APIs.signin, action.payload);
    yield put(setLoading(false));

    const { token, user } = res;
    yield put(
      updateAuth({
        ...token,
        loggedIn: true,
        errorMessage: '',
      })
    );
  } catch (error) {
    yield put(setLoading(false));
    yield put(
      updateAuth({
        errorMessage: 'Wrong user or password, please try again.',
      })
    );
  }
}

export function* logout() {
  const { email, refreshToken } = yield select((state) => state.auth);
  yield put(setLoading(true));
  try {
    yield call(APIs.signout, { email, refreshToken });
    yield put(setLoading(false));
    yield put(initAuth());
    yield put(initApp());
  } catch (error) {
    yield put(setLoading(false));
    yield put(initAuth());
    yield put(initApp());
  }
}
