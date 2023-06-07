const Message = require("../models/message");
const path = require("path");
const Category = require("../models/Category");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");

// api/v1/books
exports.getMsgs = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Message);

  const books = await Message.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
    pagination,
  });
});

// exports.getUserBooks = asyncHandler(async (req, res, next) => {
//   req.query.createUser = req.userId;
//   return this.getBooks(req, res, next);
// });

exports.getMsg = asyncHandler(async (req, res, next) => {
  const book = await Message.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

// exports.createCategory = asyncHandler(async (req, res, next) => {
//   const category = await Category.create(req.body);

//   res.status(200).json({
//     success: true,
//     data: category,
//   });
// });

exports.createMsg = asyncHandler(async (req, res, next) => {

  const book = await Message.create(req.body);

  res.status(200).json({
    success: true,
    data: book,
  });
});

exports.deleteMsg = asyncHandler(async (req, res, next) => {
  const book = await Message.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  book.remove();

  res.status(200).json({
    success: true,
    data: book,
    whoDeleted: user.name,
  });
});

exports.updateMsg = asyncHandler(async (req, res, next) => {
  const book = await Message.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }


  for (let attr in req.body) {
    book[attr] = req.body[attr];
  }

  book.save();

  res.status(200).json({
    success: true,
    data: book,
  });
});

// PUT:  api/v1/books/:id/photo
exports.uploadBookPhoto = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээ.", 400);
  }

  // image upload

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    book.photo = file.name;
    book.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
