import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

// Path to the data file
const path = "./data.json";

// Configure Git (replace with your actual GitHub email)
const git = simpleGit().addConfig('user.name', 'Akaygithubb')
                       .addConfig('user.email', '22BCS17136@cuchd.in'); // <- UPDATE THIS

// Function to generate one commit at a specific date
const markCommit = (x, y, n) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
    content: Math.random().toString(36).substring(2) // unique content per commit
  };

  jsonfile.writeFile(path, data, async () => {
    await git.add([path]);
    await git.commit(`Commit on ${date}`, [path], { "--date": date });

    console.log(`Committed: ${date}`);

    if (n > 1) {
      setTimeout(() => {
        makeCommits(n - 1); // continue
      }, 200); // delay to avoid too fast commits
    } else {
      git.push().then(() => console.log("✅ All commits pushed!"));
    }
  });
};

// Function to start committing
const makeCommits = (n) => {
  const x = random.int(0, 54); // 0 to 54 weeks
  const y = random.int(0, 6);  // 0 to 6 days
  markCommit(x, y, n);
};

// Start process
makeCommits(500); // number of commits to generate
