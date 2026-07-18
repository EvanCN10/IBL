import { NextRequest, NextResponse } from "next/server";
import lolosStaff from "@/constants/lolos_staff.json";

// Type definition for the compiled staff details
interface StaffDetail {
  nama: string;
  nrp: string;
  subdivisi: string;
  cp_name: string;
  cp_phone: string;
}

// Cast lolosStaff import to the dictionary type
const staffDatabase = lolosStaff as Record<string, StaffDetail>;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawNrp = searchParams.get("nrp");

    if (!rawNrp) {
      return NextResponse.json(
        { error: "NRP is required" },
        { status: 400 }
      );
    }

    // Normalize input NRP (remove non-digits)
    const normalizedNrp = rawNrp.trim().replace(/\D/g, "");

    if (!normalizedNrp) {
      return NextResponse.json(
        { error: "Invalid NRP format" },
        { status: 400 }
      );
    }

    // Look up the staff member in the database
    const staffMember = staffDatabase[normalizedNrp];

    if (staffMember) {
      return NextResponse.json({
        status: "lolos",
        nama: staffMember.nama,
        subdivisi: staffMember.subdivisi,
        cp_name: staffMember.cp_name,
        cp_phone: staffMember.cp_phone,
      });
    }

    // Candidate not found in the passed staff database
    return NextResponse.json({
      status: "tidak_lolos",
      nama: "",
    });
  } catch (error: any) {
    console.error("Error in announcement check API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
