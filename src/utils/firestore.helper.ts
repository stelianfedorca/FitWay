// /**
//  * Allows you to get object with specific type, when you call FirebaseFirestore.QuerySnapshot.data();
//  *
//  * @example
//  * const doc = await fsdb
//       .collection('users')
//       .withConverter(new FSDBConverter<UserFirestore>())
//       .doc(uid)
//       .get();

//     const user = doc.data() // user will be UserFirestore type
//  */
// class FSDBConverter<T> implements FirebaseFirestore.FirestoreDataConverter<T> {
//   toFirestore(modelObject: T): FirebaseFirestore.DocumentData {
//     return modelObject as FirebaseFirestore.DocumentData;
//   }
//   fromFirestore(
//     snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
//   ): T {
//     return snapshot.data() as T;
//   }
// }
