# Git Workflow Skill

## Rules
- Never push directly to master under any circumstances
- Always branch from latest master
- Read VERSION file in repo root before starting any feature

## Branch naming
Format: feat-{feature-name}_v{iteration}
- feature-name: one or two words, hyphenated, lowercase
- iteration: how many times this specific feature has been branched
- Always check existing branches to determine correct iteration number:
  git branch -a | grep feat-{feature-name}
- Examples:
  feat-proposals_v1   ← first time
  feat-proposals_v2   ← second time touching proposals

## Starting any new feature — run in order:
git checkout master
git fetch origin
git pull origin master
git branch -a | grep feat-{feature-name}
git checkout -b feat-{feature-name}_v{iteration}

## Commit rules
- One logical change per commit
- Never bundle unrelated files or changes in one commit
- Format: `<type>: <description>` — type must be one of: feat, fix, refactor, docs
- Always include Claude co-author attribution in every commit message:
  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
- Examples:
  feat: add proposals list component
  fix: correct proposal status badge colour
  refactor: extract proposal card into shared component
  docs: update proposals API route documentation
- After every commit, push the branch immediately:
  git push origin feat-{feature-name}_v{iteration}

## When feature is complete and tested:
1. Read current version from VERSION file
2. Increment based on bump type specified in the prompt:
   - patch (1.0.0 → 1.0.1): bug fixes, small tweaks
   - minor (1.0.0 → 1.1.0): new functionality, non-breaking
   - major (1.0.0 → 2.0.0): breaking changes, major redesigns
3. Update VERSION file with new version
4. Commit the bump separately:
   feat: bump version to v{new-version}
   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
5. Push branch:
   git push origin feat-{feature-name}_v{iteration}
6. Raise PR:
   gh pr create \
     --title "feat: {feature-name} [v{new-version}]" \
     --body "{brief description of what was built and changed}" \
     --base master

## After PR is approved and auto-merged:
git checkout master
git fetch origin
git pull origin master
# Branch is auto-deleted by GitHub — do not delete manually