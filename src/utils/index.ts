import { storage } from '../firebaseConfig'

const getLocaleDate = (milli: string) => {
  const date = new Date(Number(milli));
  return date.toLocaleDateString()
}

const uploadImage = (img: string, name: string, fileType: string) => {
  return new Promise<string>((resolve, reject) => {
    const pathReference = storage.ref();
    const imgRef = pathReference.child(`images/${name}.${fileType}`)
    const uploadTask = imgRef.putString(img, 'data_url')
    uploadTask.on('state_changed', null,
      function (error) {
        // Handle unsuccessful uploads
        console.log(error)
        reject(error)
      }, function () {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          resolve(downloadURL)
        })
      })
  })
}

const isObjectEmpty = (obj:any) => {
  // preprocessing
  delete obj.created_at
  delete obj.addr2
  
  let values = Object.values(obj)

  let empty = values.reduce((acc, val) => { 
    if (typeof val === 'string' || Array.isArray(val)) {
      if (val.length > 0) {
        return acc && true
      } else {
        return acc && false
      }
    } else if (typeof val === 'number') {
      return acc && true
    } else { 
      return acc && true
    }
  })
  return !empty
}

export { getLocaleDate, uploadImage, isObjectEmpty }