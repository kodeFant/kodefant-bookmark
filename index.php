<?php include "includes/header.php" ?>
<?php if (isset($_POST['submit'])) { bmAdd(); } ?>
<?php 
if(isset($_GET['id'])) {
  $clickID = $_GET['id'];

  if(isset($_GET['url'])) {
  $clickURL = $_GET['url'];
  $query = "UPDATE bookmarks SET count = count + 1 WHERE id = $clickID";
  $bm_count_query = mysqli_query($connection, $query);
  redirect($clickURL);
  }

  if (isset($_GET['reset'])) {
    $query = "UPDATE bookmarks SET count = 0 WHERE id = $clickID";
    $bm_reset_count_query = mysqli_query($connection, $query);
    redirect("/");
  }

  if (isset($_GET['delete'])) {
    $query = "DELETE FROM bookmarks WHERE id = $clickID";
    $bm_delete_query = mysqli_query($connection, $query);
    redirect("/");
  }

  if (isset($_GET['edit'])) {
    $editName = $_GET['editName'];
    $editURL = $_GET['editURL'];
    $query = "UPDATE bookmarks SET name = '{$editName}', url = '{$editURL}' WHERE id = $clickID";
    $bm_edit_query = mysqli_query($connection, $query);
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
<script>
  let bmtoPHP = {};
</script>
<div id="main" class="container">
  <h2>Add bookmark</h2>
  <form class="form-group" id="bmInsert" action="" method="POST">

    <input class="form-control" type="text" name="name" id="name" placeholder="Name your bookmark" value="<?php if(isset($_GET['title'])) { echo $_GET['title']; } ?>"
      required>
    <br>
    <div class="input-group">
      <input type="text" class="form-control" type="url" name="url" id="url" placeholder="http://" value="<?php if (isset($_GET['addBM'])) {echo $_GET['addBM']; } ?>"
        required aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-success" type="submit" name="submit">Add Bookmark</button>
      </div>
    </div>
    <br>
  </form>
  <div>
    <h2>Bookmarks</h2>
    <input type="text" class="form-control" id="bmSearch" onkeyup="filterTable()" placeholder="Search bookmarks">
    <ul id="bmList" class="list-group">
      <?php 
    $query = "SELECT * FROM bookmarks ORDER BY count DESC, id";
    $bmSelect = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($bmSelect)) {
      $bmName = $row['name'];
      $bmURL = $row['url'];
      $bmURL = urlencode($bmURL);
      $bmID = $row['id'];
      $bmCount = $row['count'];
      ?>
      <script>
        bmtoPHP[<?php echo $bmID; ?>] = {
          name: '<?php echo $bmName; ?>',
          url: '<?php echo urldecode($bmURL); ?>',
          id: '<?php echo $bmID; ?>',
          count: '<?php echo $bmCount; ?>'
        };
      </script>
      <li id="<?php echo $bmID ?>" class='bm-item'><form class="bmOptionsForm">
        <div class='row bm-row'>
          <div class='col-10 text-left bmLinkParent'>
            <a class='bmLink' href='/?url=<?php echo $bmURL; ?>&id=<?php echo $bmID; ?>' target='_blank'>
              <div class="entry">
                <img src="http://www.google.com/s2/favicons?domain_url=<?php echo $bmURL; ?>%2F" alt="">
                <span class="bm-name">
                  <?php echo $bmName; ?>
                </span>
              </div>
            </a>
          </div>
          <div class='text-right col-2'>

            <img class="caret" data-editbm="<?php echo $bmID ?>" src='images/caret-left.svg' width='18px' height='18px'>

          </div>
          
            <div class="col-12 bmOptions hidden">
              
              
            </div>
            
          
        </div>

      </form></li>
      <?php } ?>
    </ul>
  </div>
</div>




<?php include "includes/footer.php" ?>