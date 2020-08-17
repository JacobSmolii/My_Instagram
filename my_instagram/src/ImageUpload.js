import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { storage, db } from 'firebase';

function ImageUpload() {
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [caption, setCaption] = useState('');

	const handleChange = e => {
		if (e.target.files[0]) { // means, get the first file you selected and set your image in state to that
			setImage(e.target.files[0]);
		}
	}

	const handleUpload = () => {
		// next line, access the storage in firebase and get the reference to this photos
		// and we are putting the image that we grabed
		const uploadTask = storage.ref(`images/${image.name}`).put(image)
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// progress function ...
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress)
			}
		)

	}

	return (
		<div>
			abc
			{/* I want to have ... */}
			{/* Caption input */}
			{/* file picker */}
			{/* post button */}

			<input
				type="text"
				placeholder="enter a caption ..."
				value={caption}
				onChange={e => setCaption(e.target.value)}
			/>
			<input
				type="file"
				onChange={handleChange}
			/>

			<Button className="imageupload_button" onClick={handleUpload}>

			</Button>

		</div>
	)
}

export default ImageUpload
