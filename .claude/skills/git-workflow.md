# Git Workflow Skill

## Rules
- Never push directly to main under any circumstances
- Always branch from latest main
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
git checkout main
git fetch origin
git pull origin main
git branch -a | grep feat-{feature-name}
git checkout -b feat-{feature-name}_v{iteration}

## Commit rules
- One logical change per commit
- Never bundle unrelated files or changes in one commit
- Format: feat: {short description of what changed}
- Examples:
  feat: add proposals list component
  feat: add proposals API route
  feat: add proposal status badge
  feat: connect proposals page to React Query

## When feature is complete and tested:
1. Read current version from VERSION file
2. Increment based on bump type specified in the prompt:
   - patch (1.0.0 → 1.0.1): bug fixes, small tweaks
   - minor (1.0.0 → 1.1.0): new functionality, non-breaking
   - major (1.0.0 → 2.0.0): breaking changes, major redesigns
3. Update VERSION file with new version
4. Commit the bump separately:
   feat: bump version to v{new-version}
5. Push branch:
   git push origin feat-{feature-name}_v{iteration}
6. Raise PR:
   gh pr create \
     --title "feat: {feature-name} [v{new-version}]" \
     --body "{brief description of what was built and changed}" \
     --base main

## After PR is approved and auto-merged:
git checkout main
git fetch origin
git pull origin main
# Branch is auto-deleted by GitHub — do not delete manually