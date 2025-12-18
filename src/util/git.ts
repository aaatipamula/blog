import { execSync } from 'child_process';

interface ParseGitLogOptions {
  maxCount?: number;
  branch?: string;
  cwd?: string;
}

interface GitCommit {
  hash: string;
  shortHash: string;
  author: string;
  email: string;
  date: Date;
  message: string;
}

/**
 * Runs git log and parses the output into an array of commit objects
 * @param filename - Name of file to get log for
 * @param options - Git log options
 * @param options.maxCount - Maximum number of commits to return (default: 50)
 * @param options.branch - Branch to get commits from (default: current branch)
 * @param options.cwd - Working directory (default: process.cwd())
 * @returns Array of parsed commit objects
 */
function parseGitLog(filename: string, options: ParseGitLogOptions = {}): GitCommit[] {
  const { maxCount = 50, branch = 'HEAD', cwd = process.cwd() } = options;

  // Custom format string: hash, author name, author email, date (ISO), message
  const format = '%H%n%h%n%an%n%ae%n%aI%n%s%n---COMMIT_END---';
  
  try {
    const output = execSync(
      `git log ${branch} -n ${maxCount} --pretty=format:"${format}" -- ${filename}`,
      { 
        cwd,
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024 // 10MB buffer
      }
    );

    // Split by commit delimiter and filter empty entries
    const commitStrings = output
      .split('---COMMIT_END---')
      .filter(s => s.trim());

    return commitStrings.map(commitStr => {
      const lines = commitStr.trim().split('\n');
      
      return {
        hash: lines[0] || '',
        shortHash: lines[1] || '',
        author: lines[2] || '',
        email: lines[3] || '',
        date: new Date(lines[4] || ''),
        message: lines[5] || ''
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse git log: ${error.message}`);
    }
    throw error;
  }
}

function createEmptyCommit(): GitCommit {
  return {
    hash: '',
    author: '',
    email: '',
    date: new Date(),
    message: ''
  }
}

const getCommitUrl = (hash: string) => `https://github.com/${import.meta.env.PUBLIC_GH_URL}/commit/${hash}`;

export { parseGitLog, createEmptyCommit, getCommitUrl };
