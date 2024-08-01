'use client'; // converting client side to the server side

import { Fragment } from "react";
import { signInWithGoogle, signOut } from "../app/firebase"; // Correct import path
import styles from './signin.module.css';

export default function SignIn({ user }) {
  return (
    <Fragment>
      {
        user ?
          (
            <button className={styles.signin} onClick={signOut}>
              Sign Out
            </button>
          ) : (
            <button className={styles.signin} onClick={signInWithGoogle}>
              Sign In
            </button>
          )
      }
    </Fragment>
  );
}
