const mongoose = require("mongoose");

// Data Modules of sheared notes
const { SharedNoteModule } = require("../Modules/DataModule");

const shearedNotes = async (req, res) => {
  const { UserID, NotesID } = req.body;
  const checkUser = await SharedNoteModule.findOne({ UserID });
  console.log(checkUser);
  if (checkUser === null) {
    try {
      const checkUser = await SharedNoteModule.updateOne(
        { UserID },
        {
          $setOnInsert: NotesID,
        }
      );
      res.status(200).json("Adding New Sheared Note is done");
    } catch (error) {
      res.status(400).json("Note exist user");
    }
  } else {
    console.log(UserID);
    console.log(NotesID);
    try {
      const newAdd = await SharedNoteModule.create({
        UserID,
        NotesID: { NotesID },
      });
      res.status(200).json({ newAdd });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
};

module.exports = {
  shearedNotes,
};
