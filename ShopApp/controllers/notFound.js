exports.getNotFoundPage = (_, res, __)=>{
  res.status(404).render("page-not-found",{title: "Error", path: ''})
}
