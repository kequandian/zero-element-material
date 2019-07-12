import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Tags() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: '会议1' },
    { key: 1, label: '会议2' },
    { key: 2, label: '会议3' },
    { key: 4, label: '会议4' },
    { key: 5, label: '会议5' },
  ]);

  const handleDelete = chipToDelete => () => {
    if (chipToDelete.label === 'React') {
      alert('Why would you want to delete React?! :)');
      return;
    }

    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <Chip
            key={data.key}
            icon={icon}
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}