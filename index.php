<?php include "includes/header.php" ?>
<?php if (isset($_POST['submit'])) { bmAdd(); } ?>
<?php 
if(isset($_GET['id'])) {
  $clickID = $_GET['id'];
  $clickURL = $_GET['url'];

  if(isset($_GET['url'])) {
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
}
?>
<div id="main" class="container">
  <h2>Add bookmark</h2>
  <form class="form-group" id="bmInsert" action="" method="POST">

    <input class="form-control" type="text" name="name" id="name" placeholder="Name your bookmark" required>
    <br>
    <div class="input-group">
      <input type="text" class="form-control" type="url" name="url" id="url" placeholder="http://" required aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-success" type="submit" name="submit">Add Bookmark</button>
      </div>
    </div>
    <br>
  </form>
  <div>
    <h2>Bookmarks</h2>
    <ul class="list-group">
      <?php 
    $query = "SELECT * FROM bookmarks ORDER BY count DESC, id";
    $bmSelect = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($bmSelect)) {
      $bmName = $row['name'];
      $bmURL = $row['url'];
      $bmID = $row['id'];
      $bmCount = $row['count'];
      ?>
      <li class='bm-item'>
        <div class='row'>
          <div class='col-10 text-left'>
            <a class='bmLink' href='/?url=<?php echo $bmURL; ?>&id=<?php echo $bmID; ?>' target='_blank'>
              <div><img src="http://www.google.com/s2/favicons?domain_url=<?php echo $bmURL; ?>%2F" alt=""> <?php echo $bmName; ?></div>
            </a>
          </div>
          <div class='text-right col-2'>
            <img src='images/caret-left.svg' width='15px' height='15px'>
          </div>
          <div class="col-12 hidden"><a href="">Edit</a> <a href="?delete&id=<?php echo $bmID; ?>">Delete</a> Count: <?php echo $bmCount; ?> (<a href="?reset&id=<?php echo $bmID ?>">reset count</a>)</div>
        </div>
      </li>
      <?php } ?>
    </ul>
  </div>
</div>

<?php include "includes/footer.php" ?>