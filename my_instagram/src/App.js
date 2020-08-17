import React, { useState, useEffect } from 'react'
import './App.css'
import Post from './Post'
import { db, auth } from './firebase'
import { Modal, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import ImageUpload from './ImageUpload'

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
	  top: `${top}%`,
	  left: `${left}%`,
	  transform: `translate(-${top}%, -${left}%)`,
	};
  }

  const useStyles = makeStyles((theme) => ({
	paper: {
	  position: 'absolute',
	  width: 400,
	  backgroundColor: theme.palette.background.paper,
	  border: '2px solid #000',
	  boxShadow: theme.shadows[5],
	  padding: theme.spacing(2, 4, 3),
	},
  }));

function App() {
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);

	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(( authUser ) => {
			if (authUser) {
				// user has logged in
				console.log(authUser)
				setUser(authUser);
			} else {
				// user has logged out
				setUser(null);
			}
		})
		return () => {
			// perform some cleanup action
			unsubscribe();
		}
	}, [user, username])


	useEffect(() => {
		 // every single time the database is changing its gonna update
		db.collection('posts').onSnapshot(snapshot => {
			setPosts(snapshot.docs.map(doc => ({
				id: doc.id,
				post: doc.data()
			})));
		})
	}, [])

	const signUp = (e) => {
		e.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password)
			.then(authUser => {
				return authUser.user.updateProfile({
					displayName: username,
				})
			})
			.catch((error) => alert(error.message))
		setOpen(false);
	}

	const signIn = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.catch(err => alert(err.message));
		setOpenSignIn(false);
	}

   	return (
		<div className="app">
			<ImageUpload />

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img
								className="app_headerImage"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKL7Yorl95U7Ktcb1sPh-6hJz1VOumviNJbw&usqp=CAU"
								// src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKL7Yorl95U7Ktcb1sPh-6hJz1VOumviNJbw&usqp=CAU"
								alt=""
							/>
							</center>

							<Input
								placeholder="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>

							<Input
								placeholder="email"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Input
								placeholder="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button type="submit" onClick={signUp} >Sign Up</Button>
					</form>
				</div>
			</Modal>

			<Modal
				open={openSignIn}
				onClose={() => setOpenSignIn(false)}
				>
				<div style={modalStyle} className={classes.paper}>
					<form className="app__signup">
						<center>
							<img
								className="app_headerImage"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKL7Yorl95U7Ktcb1sPh-6hJz1VOumviNJbw&usqp=CAU"
								// src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKL7Yorl95U7Ktcb1sPh-6hJz1VOumviNJbw&usqp=CAU"
								alt=""
							/>
							</center>

							<Input
								placeholder="email"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Input
								placeholder="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button type="submit" onClick={signIn} >Sign Up</Button>
					</form>
				</div>
			</Modal>

			<div className="app_header">
				<img
					className="app_headerImage"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKL7Yorl95U7Ktcb1sPh-6hJz1VOumviNJbw&usqp=CAU"
					alt=""
				/>
			</div>

			{
				user ? (
					<Button onClick={() => auth.signOut()} >Logout</Button>
				) : (
					<div className="app_loginContainer">
						<Button onClick={() => setOpenSignIn(true)} >Sign In</Button>
						<Button onClick={() => setOpen(true)} >Sign Up</Button>
					</div>

				)
			}

			{
				posts.map(({id, post }) => (
						<Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
					)
				)
			}
			insta
		</div>
	);
}

export default App;
