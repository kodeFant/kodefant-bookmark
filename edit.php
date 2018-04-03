<?php include "includes/header.php" ?>
<?php if (isset($_POST['submit'])) { bmAdd(); } ?>
<?php 
if(isset($_GET['id']) && isset($_GET['edit'])) {
  $clickID = $_GET['id'];
  $clickURL = $_GET['url'];

  if(isset($_GET['name'])) {
  $query = "UPDATE bookmarks SET count = count + 1 WHERE id = $clickID";
  $bm_count_query = mysqli_query($connection, $query);
  redirect($clickURL);
  }

  if (isset($_GET['url'])) {
    $query = "UPDATE bookmarks SET count = 0 WHERE id = $clickID";
    $bm_reset_count_query = mysqli_query($connection, $query);
    redirect("/");
  }

  if (isset($_GET['delete'])) {
    $query = "DELETE FROM bookmarks WHERE id = $clickID";
    $bm_delete_query = mysqli_query($connection, $query);
    redirect("/");
  }
}



/*   function get_title($url) {
  $str = file_get_contents($url);
  if (strlen($str) > 0) {
    $str = trim(preg_replace('/\s+/', ' ', $str)); // supports line breaks inside <title>
    preg_match("/\<title\>(.*)\<\/title\>/i", $str, $title); // ignore case
    return $title[1];
  }
}
echo get_title("http://www.washingtontimes.com/"); */

?>
<div id="main" class="container">
  <h2>Edit bookmark</h2>
  <form class="form-group" id="bmInsert" action="" method="POST">

    <input class="form-control" type="text" name="name" id="name" placeholder="Name your bookmark" value="<?php if(isset($_GET['title'])) { echo $_GET['title']; } ?>" required>
    <br>
    <div class="input-group">
      <input type="text" class="form-control" type="url" name="url" id="url" placeholder="http://" value="<?php if (isset($_GET['addBM'])) {echo $_GET['addBM']; } ?>" required aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-success" type="submit" name="submit">Update Bookmark</button>
      </div>
    </div>
    <br>
  </form>
  <div>
 
  </div>
</div>

<?php include "includes/footer.php" ?>