/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Core/X3DSensorNode",
	"cobweb/Components/Grouping/X3DBoundedObject",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSensorNode, 
          X3DBoundedObject, 
          X3DConstants)
{
"use strict";

	function TransmitterPdu (executionContext)
	{
		X3DSensorNode .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .TransmitterPdu);
	}

	TransmitterPdu .prototype = $.extend (Object .create (X3DSensorNode .prototype),new X3DBoundedObject (),
	{
		constructor: TransmitterPdu,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                           new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",                         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                            new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "address",                            new Fields .SFString ("localhost")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaLocation",                    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaPatternLength",               new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaPatternType",                 new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "applicationID",                      new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "cryptoKeyID",                        new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "cryptoSystem",                       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityID",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "frequency",                          new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "inputSource",                        new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "lengthOfModulationParameters",       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeDetail",               new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeMajor",                new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeSpreadSpectrum",       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeSystem",               new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayHost",                 new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayPort",                 new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "networkMode",                        new Fields .SFString ("standAlone")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "port",                               new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "power",                              new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeCategory",            new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeCountry",             new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeDomain",              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeKind",                new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeNomenclature",        new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeNomenclatureVersion", new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "radioID",                            new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "readInterval",                       new Fields .SFFloat (0.1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "relativeAntennaLocation",            new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rtpHeaderExpected",                  new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "siteID",                             new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitFrequencyBandwidth",         new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitState",                      new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "whichGeometry",                      new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "writeInterval",                      new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkReader",                    new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkWriter",                    new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isRtpHeaderHeard",                   new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isStandAlone",                       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "timestamp",                          new Fields .SFTime ()),
		]),
		getTypeName: function ()
		{
			return "TransmitterPdu";
		},
		getComponentName: function ()
		{
			return "DIS";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return TransmitterPdu;
});


