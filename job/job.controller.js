const Job = require('./job.dao');

exports.createJob = (req, res,) => {
  const newJob = {
    name: req.body.name,
    resolved: false,
  }

  Job.create(newJob, (err, job) => {
    if (err) return res.status(500).send('Error interno');
    const datajob = {
      name: job.name,
      resolved: job.resolved,
    }
    res.send({ datajob });
  });
}

exports.search = (req, res, ) => {
  Job.find({}, (err, job) => {
    if (err) return res.status(500).send('Error interno');
    res.send({ job });
  });
}

exports.resolvedJob = (req, res, ) => {
  var id = req.params.id;
  Job.findOne({_id:id}, (err, job) => {
    if (err) return res.status(500).send('Error interno');
    if (!job) {
      res.status(409).send({ message: 'Tarea no a sido registrada' });
    } else {
      job.resolved = true;
      job.save((req, upd) =>{
        if (err) return res.status(500).send('Error interno');
        res.send({ upd });
      } );
    }
  });
}

exports.removeJob = (req, res) => {
  var id = req.params.id;
  Job.findByIdAndDelete({ _id: id }, (err, job) => {
    if (err) return res.status(500).send('Error interno');
    res.status(204).send({ 'message': 'Elemento eliminado' });
  });
}







