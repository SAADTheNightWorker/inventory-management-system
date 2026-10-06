const express = require("express");
const {
  getPolicyRecordsSec,
  createPolicyRecordsSec,
  updatePolicyRecordsSec,
  deletePolicyRecordsSec,
} = require("../controller/policyRecordSecController");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getPolicyRecordsSec);

router.post(
  "/",
  upload.fields([
    { name: "texInvoiceDoc", maxCount: 1 },
    { name: "policySecheduleDoc", maxCount: 1 },
    { name: "creditNoteDoc", maxCount: 1 },
  ]),
  createPolicyRecordsSec,
);

router.put(
  "/:id",
  upload.fields([
    { name: "texInvoiceDoc", maxCount: 1 },
    { name: "policySecheduleDoc", maxCount: 1 },
    { name: "creditNoteDoc", maxCount: 1 },
  ]),
  updatePolicyRecordsSec,
);

router.delete("/", deletePolicyRecordsSec);

module.exports = router;
