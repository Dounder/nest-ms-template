---
applyTo: '**/changelog.md,**/package.json'
---

# Changelog Guide with Git CLI

**IMPORTANT**: Always use Git CLI commands to analyze changes before creating changelog entries. Create version tags and push changes to facilitate rollbacks and team synchronization.

## Chat Behavior

**DO NOT EXPLAIN** what you are going to do. **DIRECTLY EXECUTE** the Git CLI commands and create the changelog entries. Upon completion, **ONLY** provide a brief explanation indicating whether the version is MAJOR, MINOR, or PATCH and why.

## Mandatory Workflow

### 1. Change Analysis with Git CLI

Before creating any changelog entry, **ALWAYS** execute these commands:

```bash
# Review commits since the last version
git log --oneline --since="YYYY-MM-DD" --until="YYYY-MM-DD"

# View detailed differences from the last tag
git diff $(git describe --tags --abbrev=0)..HEAD

# List modified files
git diff --name-only $(git describe --tags --abbrev=0)..HEAD

# View commits by author (optional)
git log --pretty=format:"%h - %an, %ar : %s" --since="YYYY-MM-DD"
```

### 2. Version Update

Update the version in `package.json` following [Semantic Versioning](https://semver.org/lang/en/):

```yaml
version: X.Y.Z+build_number
```

### 3. Commit Changes

**MANDATORY**: Commit the changelog and package.json changes:

```bash
# Stage the modified files
git add changelog.md package.json

# Commit with descriptive message
git commit -m "chore: update changelog and version to vX.Y.Z

- Updated changelog with changes from $(git describe --tags --abbrev=0)..HEAD
- Bumped version to X.Y.Z in package.json
- Prepared for tag vX.Y.Z creation"

# Verify commit was created
git log --oneline -1
```

### 4. Version Tag Creation

**MANDATORY**: After committing changes, create and push the tag:

```bash
# Create annotated tag with message
git tag -a vX.Y.Z -m "Release version X.Y.Z - [Brief description]"

# Push the commit to remote repository
git push origin HEAD

# Push tag to remote repository
git push origin vX.Y.Z

# Verify that the tag was created correctly
git tag -l | grep vX.Y.Z
```

### 5. Branch Push and Synchronization

**MANDATORY**: Ensure all changes are synchronized with the remote repository:

```bash
# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Push current branch with all commits
git push origin $CURRENT_BRANCH

# Verify remote synchronization
git status

# Optional: Create pull request or merge request (if using feature branch)
# This step depends on your workflow - mention in commit message if PR is needed
```

### 6. Rollback Commands (For Emergencies)

In case of errors, use these commands for rollback:

```bash
# View all available tags
git tag -l

# Rollback to previous version (creates detached HEAD)
git checkout vX.Y.Z-previous

# Create hotfix branch from previous tag
git checkout -b hotfix/vX.Y.Z-fix vX.Y.Z-previous

# Remove erroneous tag (local and remote)
git tag -d vX.Y.Z
git push origin --delete vX.Y.Z

# Reset to previous commit (DANGEROUS - use with caution)
git reset --hard HEAD~1
```

## Changelog Format

Changes must be recorded in the `changelog.md` file following the guidelines of [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) **based exclusively on Git CLI analysis**.

### Version Format

Versions follow the `MAJOR.MINOR.PATCH+BUILD` format where:

- **MAJOR**: Incompatible changes with previous versions
- **MINOR**: New features compatible with previous versions
- **PATCH**: Bug fixes compatible with previous versions
- **BUILD**: Incremental build number

### Mandatory Sections

**ALL versions MUST include these sections** (use "None" if not applicable):

- **Added**: For new features
- **Changed**: For changes to existing functionalities
- **Removed**: For features removed in this version
- **Fixed**: For bug fixes

### Entry Format with Git Reference

```markdown
## Version X.Y.Z+BUILD [YYYY-MM-DD]

> **Included Commits**: `git log --oneline vX.Y.Z-previous..vX.Y.Z`
> **Tag**: `vX.Y.Z`
> **Branch**: `branch-name`
> **Commit**: `commit-hash`

### Added

- Description of the new feature (Commit: `abc1234`)

### Changed

- Description of the change made (Commit: `def5678`)

### Removed

- None

### Fixed

- Description of the bug fixed (Commit: `ghi9012`)
```

### Hierarchical Format for Grouping

When multiple features are related to the same component:

```markdown
### Added

- Component `ModuleName` (Commits: `abc1234`, `def5678`):
  - Specific feature 1
  - Specific feature 2
  - Specific feature 3
- Area configuration (Commit: `ghi9012`):
  - Configuration item 1
  - Configuration item 2
- Independent feature (Commit: `jkl3456`)

### Changed

- Component `ModuleName` (Commit: `mno7890`):
  - Specific change 1
  - Specific change 2
```

**Rules for hierarchical format:**

- Use backticks `WidgetName` for Widget, module, or component names
- Include commit hashes in parentheses for traceability
- Indent with two spaces for sub-bullets
- Group related features under the same component or area
- Keep independent features as main bullets

### Best Practices

1. **DO NOT EXPLAIN** the process - execute commands directly
2. **ALWAYS** analyze changes with Git CLI before writing
3. **MANDATORY** commit changes before creating tags
4. **MANDATORY** create version tag and push to remote
5. **MANDATORY** push branch with all commits
6. Maintain a log for each version
7. The most recent entries are placed at the beginning
8. Always include the release date in [YYYY-MM-DD] format
9. Reference specific commits for traceability
10. Group changes by type and component
11. Be specific and concise
12. Verify that commits, tags, and pushes completed successfully
13. **AT THE END** briefly explain if it is MAJOR, MINOR, or PATCH

### Final Verification Commands

Before completing the process, execute:

```bash
# Verify that the commit exists
git log --oneline -1

# Verify that the tag exists locally
git tag -l | grep vX.Y.Z

# Verify that the tag points to the correct commit
git show vX.Y.Z

# Verify that the tag is in the remote repository
git ls-remote --tags origin | grep vX.Y.Z

# Verify that the branch is up to date with remote
git status

# Verify that all commits are pushed
git log --oneline origin/$(git branch --show-current)..HEAD
```

### Complete Git Workflow Template

```bash
# 1. Analyze changes
git log --oneline $(git describe --tags --abbrev=0)..HEAD
git diff $(git describe --tags --abbrev=0)..HEAD

# 2. Update files (changelog.md and package.json)
# [Manual editing of files]

# 3. Commit changes
git add changelog.md package.json
git commit -m "chore: update changelog and version to vX.Y.Z

- Updated changelog with changes from $(git describe --tags --abbrev=0)..HEAD
- Bumped version to X.Y.Z in package.json
- Prepared for tag vX.Y.Z creation"

# 4. Create and push tag
git tag -a vX.Y.Z -m "Release version X.Y.Z - [Brief description]"
git push origin HEAD
git push origin vX.Y.Z

# 5. Verify everything
git status
git tag -l | grep vX.Y.Z
git ls-remote --tags origin | grep vX.Y.Z
```

### Final Response Format

After completing the entire process, provide **ONLY** this information:

```
✅ Changelog updated to version X.Y.Z
📋 Type: [MAJOR/MINOR/PATCH] - [Brief reason for version type]
🏷️ Tag vX.Y.Z created and pushed to remote
🚀 Branch pushed with all commits
📍 Commit: [commit-hash]
```

**Example of final response:**

```
✅ Changelog updated to version 2.1.0
📋 Type: MINOR - New compatible features were added
🏷️ Tag v2.1.0 created and pushed to remote
🚀 Branch pushed with all commits
📍 Commit: abc1234f
```

### Emergency Procedures

If something goes wrong during the process:

1. **Failed commit**: Check file status with `git status` and retry
2. **Failed tag creation**: Verify commit exists and tag name is unique
3. **Failed push**: Check network connection and repository permissions
4. **Wrong version**: Use rollback commands to revert and start over

### Integration with CI/CD

This workflow is compatible with most CI/CD systems. The pushed tag can trigger:

- Automated builds
- Release deployments
- Notification systems
- Documentation updates

Ensure your CI/CD pipeline is configured to respond to version tags matching the pattern `v*.*.*`.I've improved your copilot instruction with the following key enhancements:
