<?php include "includes/header.php" ?>
<?php if (isset($_POST['submit'])) { bmAdd(); } ?>
<div id="main" class="container">
  <h2>Add bookmark</h2>
  <form class="form-group" id="bmInsert" action="" method="POST">

    <input class="form-control" type="text" name="name" id="name" placeholder="Name your bookmark" required>
    <br>
    <div class="input-group">
      <input type="text" class="form-control" type="url" name="url" id="url" placeholder="http://" required aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="submit" name="submit">Add Bookmark</button>
      </div>
    </div>
    <br>
  </form>
  <div>
    <h2>Bookmarks</h2>
    <ul class="list-group">
      <?php 
    $query = "SELECT * FROM bookmarks";
    $bmSelect = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($bmSelect)) {
      $bmName = $row['name'];
      $bmURL = $row['url'];
      $bmID = $row['id'];
      echo "<a href='{$bmURL}' target='_blank'><li class='bm-item'>{$bmName}</li></a>";
    }
    
    ?>
    </ul>
  </div>
</div>

<?php include "includes/footer.php" ?>